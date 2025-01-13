import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grad1)"
          className="animate-fade-in"
        />
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 50 + 10}
            fill="#60a5fa"
            className="animate-float"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
