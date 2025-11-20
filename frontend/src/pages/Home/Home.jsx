import "./Home.css";
import { FiSearch } from "react-icons/fi";

export default function Home() {
  return (
    <div className="home-page">

      {/* MAP SECTION */}
      <div className="map-container">
        <img src="/map-image.png" alt="map" /> 
        {/* replace with your map component if needed */}
      </div>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search map" />
      </div>

    </div>
  );
}
