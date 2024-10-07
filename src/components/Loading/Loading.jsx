import React from "react";

function Loading({ theme, background, height, width }) {
  const validTheme = theme === "black" || theme === "white" ? theme : "black";
  return (
    <div
      className={`${height} ${width} flex flex-col justify-center items-center text-center ${background}`}
    >
      <div
        className={`animate-spin inline-block size-12 border-[5px] border-current border-t-transparent rounded-full text-${validTheme}`}
      ></div>
    </div>
  );
}

export default Loading;
