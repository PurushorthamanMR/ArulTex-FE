import React, { useEffect } from "react";

const MouseHover = () => {
  const handleMouseOver = (e) => {
    e.stopPropagation();

    if (
      document.body.classList.contains("mini-sidebar") &&
      document.getElementById("toggle_btn").offsetParent !== null
    ) {
      const target = e.target.closest(".sidebar, .header-left");

      if (target) {
        document.body.classList.add("expand-menu");
        document
          .querySelectorAll(".subdrop + ul")
          .forEach((ul) => ul.slideDown());
      } else {
        document.body.classList.remove("expand-menu");
        document
          .querySelectorAll(".subdrop + ul")
          .forEach((ul) => ul.slideUp());
      }

      return false;
    }
  };

  useEffect(() => {
    init(); // Assuming init is a function that you need to call when the component mounts

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    // Your component JSX
    <div>{/* Your component content */}</div>
  );
};

export default MouseHover;
