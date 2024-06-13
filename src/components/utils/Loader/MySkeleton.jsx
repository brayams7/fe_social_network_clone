import React from "react";
import ContentLoader from "react-content-loader";

const MySkeleton = ({
  width="100%", 
  height=700, 
  backgroundColor="#677ca8", 
  foregroundColor="#f1eeee", 
  speed=3
}) => {
  return (
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      // viewBox="0 0 800 160"
      backgroundColor={backgroundColor}
      foregroundColor= {foregroundColor}
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  );
}

export default MySkeleton;
