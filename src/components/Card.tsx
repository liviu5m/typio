"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

type Word = {
  word: string;
  status: number;
};

export default function Card({ words }: { words: Word[] }) {
  const [totalChars, setTotalChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const submitResult = debounce(
    async (userId: string | null, wordsNumber: number) => {
      try {
        const res = await axios.post("/api/record", { userId, wordsNumber });
        console.log("Record saved:", res.data);
      } catch (err) {
        console.error("Error saving record:", err);
      }
    },
    500
  );

  useEffect(() => {
    const filteredWords = words.filter((word) => word.status !== 0);
    const newTotalChars = filteredWords.reduce(
      (sum, word) => sum + word.word.length,
      0
    );
    const newTotalCorrectChars = filteredWords
      .filter((word) => word.status === 1)
      .reduce((sum, word) => sum + word.word.length, 0);

    setTotalChars(newTotalChars);
    setTotalCorrectChars(newTotalCorrectChars);
    if (
      words.filter((word) => word.status == -1).length <= 20 &&
      Math.round(newTotalChars / 5) != 0
    )
      submitResult(
        localStorage.getItem("userId"),
        Math.round(newTotalChars / 5)
      );
  }, [words]);

  return (
    <div className="px-10 py-5 rounded-lg bg-[#eee] text-black text-lg flex flex-col gap-5 mt-10">
      <h1 className="text-xl font-bold">Results</h1>
      <h1 className="text-green-500">{Math.round(totalChars / 5)} WPM</h1>
      <h1>
        Accuracy:{" "}
        {totalChars == 0
          ? 0
          : Math.round((totalCorrectChars / totalChars) * 100)}
        %
      </h1>
      <h1>
        Correct Words:{" "}
        <span className="text-green-500">
          {words.filter((word) => word.status == 1).length}
        </span>
      </h1>
      <h1>
        Wrong Words:{" "}
        <span className="text-red-500">
          {words.filter((word) => word.status == -1).length}
        </span>
      </h1>
      {words.filter((word) => word.status == -1).length > 20 && (
        <h2 className="text-red-500">
          You've made more than 20 mistakes <br /> Result doesn't count.
        </h2>
      )}
    </div>
  );
}
