import React from "react";
import "./SafetyTips.css"; 

export default function SafetyTips() {
  return (
    <div className="safety-container">
      <h1 className="safety-title">Welcome to the Safety Page</h1>
      <h2 className="safety-subheading">Learn about other ways you can be safe walking alone at night!</h2>

      <div className="safety-section">
        <h2 className="section-title">Tips</h2>
        <h3 className="section-subtitle">Stay Alert</h3>
        <ul className="section-text">
          <li>Keep your head up</li>
          <li>Make eye contact with people passing by</li>
          <li>Don’t wear headphones</li>
          <li>Don’t wear a hoodie – it limits your peripheral vision</li>
        </ul>

        <h3 className="section-subtitle">Plan Your Route</h3>
          <ul className="section-text">
            <li>Check what your route is going to be ahead of time</li>
            <li>Let a friend or family member know your estimated time of return</li>
            <li>Wear reflective clothing to be more easily spotted by cars and bikes</li>
          </ul>

      </div>

      <div className="safety-section">
        <h2 className="section-title">Other External Resources</h2>
        <p className="section-text">
          Add more sections as needed. Customize the colors, font sizes, and spacing in the CSS.
        </p>
      </div>

    </div>
  );
}
