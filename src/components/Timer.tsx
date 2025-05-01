"use client";

import React, { useEffect, useState } from "react";

export default function Timer({
  start,
  setStart,
}: {
  start: boolean;
  setStart: (e: boolean) => void;
}) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!start) setSeconds(60);
    if (start && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else setStart(false);
  }, [seconds, start]);

  const displayMinutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return (
    <div className="w-20 p-5 bg-[#00ADB5] text-[#eee] flex items-center justify-center rounded-lg text-xl font-bold">
      <h2>
        {displayMinutes}:{displaySeconds.toString().padStart(2, "0")}
      </h2>
    </div>
  );
}
