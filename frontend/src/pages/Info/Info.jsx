import React from "react";
import "./Info.css"; 

export default function InfoPage() {
  return (
    <div className="info-container">
      <h1 className="info-title">Welcome to the Information Page</h1>

      <div className="info-section">
        <h2 className="section-title">About</h2>
        <p className="section-text">
          This is an example section. You can place any information here.
        </p>
      </div>

      <div className="info-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-text">
          Add more sections as needed. Customize the colors, font sizes, and spacing in the CSS.
        </p>
      </div>

    </div>
  );
}
