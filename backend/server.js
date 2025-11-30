import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import polyline from "polyline";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { scoreRouteLighting } from "./lib/lightingScore.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic middleware
app.use(cors());
app.use(express.json());

// Load streetlight data once at startup
const streetLightsPath = path.join(__dirname, "streetlights", "street_lights.geojson");
let streetLights = [];

try {
  const raw = fs.readFileSync(streetLightsPath, "utf8");
  const geojson = JSON.parse(raw);
  streetLights = geojson.features || [];
  console.log(`Loaded ${streetLights.length} streetlights from GeoJSON.`);
} catch (err) {
  console.error("Error loading streetlights GeoJSON:", err.message);
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", streetLights: streetLights.length });
});

/**
 * GET /api/safe-route
 * Query params:
 *   origin: string (address OR "lat,lng")
 *   destination: string (address OR "lat,lng")
 *
 * Example:
 *   /api/safe-route?origin=45.4215,-75.6972&destination=45.428,-75.692
 */
app.get("/api/safe-route", async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({
      error: "Missing origin or destination query param."
    });
  }

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return res.status(500).json({
      error: "Backend is missing GOOGLE_MAPS_API_KEY."
    });
  }

  try {
    // Call Google Directions API (legacy Directions web service)
    // docs: https://developers.google.com/maps/documentation/directions :contentReference[oaicite:4]{index=4}
    const directionsUrl = "https://maps.googleapis.com/maps/api/directions/json";

    const { data } = await axios.get(directionsUrl, {
      params: {
        origin,
        destination,
        mode: "walking",
        alternatives: true, // ask for multiple candidate routes
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    if (data.status !== "OK" || !data.routes || data.routes.length === 0) {
      return res.status(502).json({
        error: "No routes found from Google Directions API.",
        googleStatus: data.status,
        googleErrorMessage: data.error_message
      });
    }

    // Score each route by lighting
    const scoredRoutes = data.routes.map((route, index) => {
      const encoded = route.overview_polyline?.points;
      if (!encoded) {
        return {
          index,
          score: 0,
          totalLights: 0,
          density: 0,
          routeLengthMeters: 0,
          rawRoute: route
        };
      }

      const decoded = polyline.decode(encoded); // [[lat, lng], ...]
      const lightingStats = scoreRouteLighting(decoded, streetLights, 40); // 40m radius

      return {
        index,
        ...lightingStats,
        // keep distance/duration for the user
        distance: route.legs?.[0]?.distance,
        duration: route.legs?.[0]?.duration,
        rawRoute: route
      };
    });

    // Find the best-lit route (highest score)
    const best = scoredRoutes.reduce((acc, r) =>
      r.score > acc.score ? r : acc,
      scoredRoutes[0]
    );

    res.json({
      origin,
      destination,
      candidateRoutes: scoredRoutes.map((r) => ({
        index: r.index,
        score: r.score,
        density: r.density,
        totalLights: r.totalLights,
        routeLengthMeters: r.routeLengthMeters,
        distance: r.distance,
        duration: r.duration
      })),
      bestRouteIndex: best.index,
      bestRoute: best.rawRoute // full Google route object, including polyline
    });
  } catch (err) {
    console.error("Error in /api/safe-route:", err.message);
    res.status(500).json({
      error: "Internal server error while computing safe route.",
      details: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Light My Way backend listening on port ${PORT}`);
});
