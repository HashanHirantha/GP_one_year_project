import React from 'react';

const LogoIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 120 100" 
    className={className}
    fill="none"
  >
    {/* Sun/Moon solid green */}
    <circle cx="44" cy="32" r="21" fill="#7ED957" />
    
    {/* Right House Base Fill (to obscure circle if it overlaid) */}
    <path 
      d="M 105,76 L 105,45 L 85,25 L 62.5,47.5 L 62.5,76 Z" 
      fill="#FFFFFF" 
    />
    
    {/* Left House Base Fill (to obscure circle) */}
    <path 
      d="M 40,70 L 40,55 L 55,40 L 70,55 L 70,70 Z" 
      fill="#FFFFFF" 
    />

    {/* Right House Outline */}
    <path 
      d="M 105,76 L 105,45 L 85,25 L 62.5,47.5" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    {/* Left House Outline */}
    <path 
      d="M 40,70 L 40,55 L 55,40 L 70,55 L 70,70" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    {/* Upper Ground Lines */}
    <path 
      d="M 4,70 L 40,70 M 70,70 L 95,70" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />

    {/* Lower Ground Line */}
    <path 
      d="M 15,76 L 105,76" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />

    {/* Left Tree Base Stem */}
    <path 
      d="M 14,70 L 14,60" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />

    {/* Left Tree Leaf Fill and Outline */}
    <path 
      d="M 14,60 Q 22,50 14,35 Q 6,50 14,60 Z" 
      fill="#FFFFFF" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinejoin="round" 
    />

    {/* Left Tree Stripes */}
    <path 
      d="M 8.5,54 L 18,51 M 10.5,46 L 17,43" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />

    {/* Right Tree Base Stem */}
    <path 
      d="M 28,70 L 28,62" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />

    {/* Right Tree Leaf Fill and Outline */}
    <path 
      d="M 28,62 Q 35,54 28,42 Q 21,54 28,62 Z" 
      fill="#FFFFFF" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinejoin="round" 
    />

    {/* Right Tree Stripes */}
    <path 
      d="M 23.5,57 L 31.5,54 M 25,50 L 30,48" 
      stroke="#333333" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />

    {/* Sun/Moon Offset Outline (drawn after houses and trees so it goes over them) */}
    <circle cx="38" cy="36" r="21" stroke="#333333" strokeWidth="3" />
  </svg>
);

export default LogoIcon;
