import React, { useEffect, useRef } from "react";
import dragula from "dragula";

const YourComponent = () => {
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);

  useEffect(() => {
    const leftContainer = leftContainerRef.current;
    const rightContainer = rightContainerRef.current;

    if (leftContainer && rightContainer) {
      dragula([leftContainer, rightContainer]);
    }

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array ensures useEffect runs once after component mount

  return (
    <div>
      <div ref={leftContainerRef} id="draggable-left">
        {/* Content for the left container */}
      </div>
      <div ref={rightContainerRef} id="draggable-right">
        {/* Content for the right container */}
      </div>
    </div>
  );
};

export default YourComponent;
