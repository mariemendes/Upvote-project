import React from "react";

export function ArrowIcon({ width, height, fill }) {
  return (
    <svg
      data-testid="upvote-icon" 
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={ fill }
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L22 12H14V22H10V12H2L12 2Z" />
    </svg>
  );
}

