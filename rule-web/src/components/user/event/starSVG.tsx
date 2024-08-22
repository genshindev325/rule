// components/event/startSVG.tsximport React from 'react';

interface StarProps {
  gradientColors?: string[];
  size?: number;
}

const Star: React.FC<StarProps> = ({ gradientColors = ['#7c5ded', '#83d5f7'], size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 19.481 19.481"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={gradientColors[0]} />
        <stop offset="100%" stopColor={gradientColors[1]} />
      </linearGradient>
    </defs>
    <g>
      <path
        fill="url(#gradient)"
        d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"
      />
    </g>
  </svg>
);

export default Star;