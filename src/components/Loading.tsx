import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center z-50 justify-center">
      <div className="loader"></div>
    </div>
  );
}
