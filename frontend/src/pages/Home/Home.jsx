import { FiSearch } from "react-icons/fi";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        {/* Put your map or homepage content here */}
      </div>

      {/* Search bar at bottom above footer */}
      <div className="search-bar-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search location..."
          className="search-input"
        />
      </div>
    </div>
  );
}
