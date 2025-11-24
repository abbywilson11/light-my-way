import React from "react";
import "./SafetyTips.css"; 

export default function SafetyTips() {
  return (
    <div className="safety-container">
      <h1 className="safety-title">Welcome to the Safety Page</h1>
      <h2 className="safety-subheading">Learn about other ways you can be safe walking alone at night!</h2>

      <div className="safety-section">
        <h2 className="section-title">Tips</h2>
        <p className="section-text">
          This is an example section. You can place any information here.
        </p>
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
