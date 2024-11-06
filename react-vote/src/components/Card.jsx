import React from "react";

const Card = ({ children, title, subtitle, image,className }) => {
  return (
    <div className={className}>
      {image && <img src={image} alt={title} className="card-image"   style={{ width: '200px', height: '200px', objectFit: 'cover' }} />}
      <div className="card-content">
        {title && <h2 className="card-title">{title}</h2>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
