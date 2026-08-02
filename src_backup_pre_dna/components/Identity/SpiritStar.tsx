import React from 'react';

export const SpiritStar = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
    >
      {/* Background Rings */}
      <circle cx="250" cy="250" r="200" stroke="#f0f0f0" strokeWidth="1" />
      <circle cx="250" cy="250" r="140" stroke="#f0f0f0" strokeWidth="1" />
      
      {/* The Star Path */}
      <path 
        d="M250 50 L295 180 L440 180 L325 265 L370 400 L250 315 L130 400 L175 265 L60 180 L205 180 Z" 
        stroke="#e30613" 
        strokeWidth="3" 
        fill="rgba(227, 6, 19, 0.05)"
      />

      {/* Central Identity Dot */}
      <circle cx="250" cy="245" r="70" fill="#fff" stroke="#eee" />
      <text x="250" y="240" textAnchor="middle" fill="#000" fontSize="16" fontWeight="900">SPIRIT</text>
      <text x="250" y="260" textAnchor="middle" fill="#e30613" fontSize="16" fontWeight="900">CARE</text>

      {/* Point Labels */}
      <g className="star-point">
        <text x="250" y="35" textAnchor="middle" fill="#000" fontSize="18" fontWeight="900">SOUL</text>
      </g>
      <g className="star-point">
        <text x="460" y="195" textAnchor="middle" fill="#000" fontSize="18" fontWeight="900">SUN</text>
      </g>
      <g className="star-point">
        <text x="380" y="440" textAnchor="middle" fill="#000" fontSize="18" fontWeight="900">WATER</text>
      </g>
      <g className="star-point">
        <text x="120" y="440" textAnchor="middle" fill="#000" fontSize="18" fontWeight="900">EARTH</text>
      </g>
      <g className="star-point">
        <text x="40" y="195" textAnchor="middle" fill="#000" fontSize="18" fontWeight="900">AIR</text>
      </g>
    </svg>
  );
};
