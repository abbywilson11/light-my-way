// lib/lightingScore.js

// Haversine distance in meters between two lat/lng points
function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Compute total route length in meters
function computeRouteLengthMeters(coords) {
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    const [lat1, lon1] = coords[i - 1];
    const [lat2, lon2] = coords[i];
    total += haversineMeters(lat1, lon1, lat2, lon2);
  }
  return total;
}

/**
 * Score a route based on nearby streetlights.
 *
 * @param {Array<[number, number]>} routeCoords - decoded polyline [ [lat, lng], ... ]
 * @param {Array<Object>} streetLights - GeoJSON features array
 * @param {number} radiusMeters - how far from the route counts as "lit"
 */
export function scoreRouteLighting(routeCoords, streetLights, radiusMeters = 40) {
  if (!routeCoords || routeCoords.length < 2) {
    return { score: 0, totalLights: 0, routeLengthMeters: 0, density: 0 };
  }

  // 1) Bounding box of route for quick pre-filter
  const lats = routeCoords.map((p) => p[0]);
  const lngs = routeCoords.map((p) => p[1]);

  const paddingDegrees = 0.01; // ~1km padding, rough
  const minLat = Math.min(...lats) - paddingDegrees;
  const maxLat = Math.max(...lats) + paddingDegrees;
  const minLng = Math.min(...lngs) - paddingDegrees;
  const maxLng = Math.max(...lngs) + paddingDegrees;

  const candidateLights = streetLights.filter((feature) => {
    const [lng, lat] = feature.geometry.coordinates; // GeoJSON is [lng, lat]
    return (
      lat >= minLat &&
      lat <= maxLat &&
      lng >= minLng &&
      lng <= maxLng
    );
  });

  // 2) For each candidate light, check if it's within radius of any route point
  let totalLights = 0;

  for (const light of candidateLights) {
    const [lightLng, lightLat] = light.geometry.coordinates;
    let isClose = false;

    for (const [lat, lng] of routeCoords) {
      const d = haversineMeters(lat, lng, lightLat, lightLng);
      if (d <= radiusMeters) {
        isClose = true;
        break;
      }
    }

    if (isClose) totalLights++;
  }

  const routeLengthMeters = computeRouteLengthMeters(routeCoords);
  const density = routeLengthMeters > 0
    ? (totalLights / routeLengthMeters) * 1000 // lights per km
    : 0;

  // Simple score: just use density. You can tweak this later.
  const score = density;

  return {
    score,
    totalLights,
    routeLengthMeters,
    density
  };
}
