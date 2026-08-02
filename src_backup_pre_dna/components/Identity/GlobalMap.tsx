import React from 'react';
import Link from 'next/link';

export const GlobalMap = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 1000 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: '1000px' }}
    >
      {/* Concentric Circles radiating from Egypt */}
      <circle className="map-ring" cx="500" cy="300" r="40" stroke="#e30613" strokeWidth="0.5" strokeOpacity="0.4" />
      <circle className="map-ring" cx="500" cy="300" r="100" stroke="#e30613" strokeWidth="0.5" strokeOpacity="0.3" />
      <circle className="map-ring" cx="500" cy="300" r="180" stroke="#e30613" strokeWidth="0.5" strokeOpacity="0.2" />
      <circle className="map-ring" cx="500" cy="300" r="280" stroke="#e30613" strokeWidth="0.5" strokeOpacity="0.1" />
      <circle className="map-ring" cx="500" cy="300" r="400" stroke="#e30613" strokeWidth="0.5" strokeOpacity="0.05" />

      {/* World Map Placeholder Path (Simplified) */}
      <path 
      d="M100,200 Q150,150 200,180 T300,150 T400,200 T500,250 T600,200 T700,220 T800,180 T900,250" 
      stroke="#eee" strokeWidth="2" fill="none" opacity="0.3" 
      />

      {/* Egypt Center */}
      <Link href="/projects/thecapitalcairo" style={{ cursor: 'pointer' }}>
      <circle cx="500" cy="300" r="8" fill="#e30613" />
      <text x="515" y="305" fill="#000" fontSize="16" fontWeight="900" style={{ textTransform: 'uppercase' }}>Egypt</text>
      </Link>

      {/* Connected Nodes */}
      <Link href="/projects" style={{ cursor: 'pointer' }}>
      <g className="map-node">
          <circle cx="420" cy="180" r="4" fill="#e30613" />
          <text x="360" y="170" fill="#666" fontSize="11">Netherlands</text>
      </g>
      </Link>
      <Link href="/projects/helsinki-south-harbor-competition-2" style={{ cursor: 'pointer' }}>
      <g className="map-node">
          <circle cx="460" cy="160" r="4" fill="#e30613" />
          <text x="460" y="150" fill="#666" fontSize="11">Finland</text>
      </g>
      </Link>
      <Link href="/projects/international-design-competition-for-library-songdo-international-city" style={{ cursor: 'pointer' }}>
      <g className="map-node">
          <circle cx="780" cy="240" r="4" fill="#e30613" />
          <text x="790" y="245" fill="#666" fontSize="11">South Korea</text>
      </g>
      </Link>
      <Link href="/projects/vingroup-cam-lam" style={{ cursor: 'pointer' }}>
      <g className="map-node">
          <circle cx="720" cy="350" r="4" fill="#e30613" />
          <text x="730" y="360" fill="#666" fontSize="11">Vietnam</text>
      </g>
      </Link>
      <Link href="/projects/majarra" style={{ cursor: 'pointer' }}>
      <g className="map-node">
          <circle cx="580" cy="320" r="4" fill="#e30613" />
          <text x="590" y="330" fill="#666" fontSize="11">UAE</text>
      </g>
      </Link>
      <Link href="/projects/erafrika-2" style={{ cursor: 'pointer' }}>
      <g className="map-node">
          <circle cx="510" cy="550" r="4" fill="#e30613" />
          <text x="520" y="565" fill="#666" fontSize="11">South Africa</text>
      </g>
      </Link>
    </svg>
  );
};
