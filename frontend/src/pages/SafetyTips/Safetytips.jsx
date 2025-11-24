import React from "react";
import "./SafetyTips.css";

export default function SafetyTips() {
  return (
    <div className="safety-container">
      <h1 className="safety-title">Welcome to the Safety Page</h1>
      <h2 className="safety-subheading">
        Learn about ways to stay safe walking alone at night!
      </h2>

      {/* Tips Section */}
      <div className="safety-section">
        <h2 className="section-title">Tips</h2>

        <h3 className="section-subtitle">Stay Alert</h3>
        <ul className="section-text">
          <li>Keep your head up</li>
          <li>Make eye contact with others</li>
          <li>Don’t wear headphones</li>
          <li>Avoid hoodies that block peripheral vision</li>
        </ul>

        <h3 className="section-subtitle">Plan Your Route</h3>
        <ul className="section-text">
          <li>Check your route ahead of time</li>
          <li>Tell someone when you expect to return</li>
          <li>Wear reflective clothing for visibility</li>
        </ul>
      </div>

      {/* Resources Section */}
      <div className="safety-section">
        <h2 className="section-title">External Resources</h2>
        <ul className="section-text">
          <li>Emergency Line: 9-1-1</li>
          <li>Non-Emergency (Suspicious Activity): 613-236-1222</li>
          <li>City of Ottawa Emergency Info: Community Planning</li>
          <li>Women & Children Shelter (Domestic Abuse): 2-1-1</li>
          <li>Indigenous Crisis Line: 1-855-242-3310</li>
        </ul>

        <h3 className="section-subtitle">Campus Emergency Lines</h3>
        <ul className="section-text">
          <li>uOttawa: 613-562-5411</li>
          <li>Carleton: 613-520-4444</li>
          <li>Algonquin College: EXT. 5000</li>
        </ul>
      </div>
    </div>
  );
}
