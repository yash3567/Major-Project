import React from "react";
import "./about.css";

const FlipCard = ({ name, image, contribution, connect }) => {
  return (
    <div className="flip-card-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front">
            <img src={image} alt={name} className="circle-image" />
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <p className="text-sm">{contribution}</p>
            {connect && (
              <a href={connect} target="_blank" rel="noopener noreferrer">
                Connect
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Name displayed outside below the circle */}
      <p className="name-label">{name}</p>
    </div>
  );
};

export default FlipCard;
