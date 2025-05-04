"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Timer from "@/components/Timer";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Word = {
  word: string;
  status: number;
};

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [wordId, setWordId] = useState(0);
  const [inputWord, setInputWord] = useState("");
  const [wordClass, setWordClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [result, setResult] = useState<Word[]>([]);

  const wordRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (wordRefs.current[wordId]) {
      wordRefs.current[wordId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [wordId]);
  

  useEffect(() => {
    if (!start) {
      setResult(words);
      inputRef.current?.blur();
      setWordId(0);
      getWords();
      setInputWord("");
      setStart(false);
      setWordClass("");
    }
  }, [start]);

  const getWords = async () => {
    setLoading(true);
    const promises = [];
    const wordsArray: { word: string; status: number }[] = [];

    for (let i = 0; i < 20; i++) {
      const randomLetter = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      promises.push(
        axios.get(
          `https://api.datamuse.com/words?sp=${randomLetter}????*&max=20`
        )
      );
    }

    try {
      const responses = await Promise.all(promises);

      responses.forEach((res) => {
        const processedWords = res.data.map((el: { word: string }) => {
          let cleanedWord = el.word.replace(/[-\s]/g, "");
          return { word: cleanedWord, status: 0 };
        });

        // Filter words with at least 5 letters
        const filteredWords = processedWords.filter(
          (w: { word: string }) => w.word.length >= 5
        );

        wordsArray.push(...filteredWords);
      });

      // Shuffle the array
      const shuffledArray = shuffleArray(wordsArray);

      // Pick exactly 200 words
      const selectedWords = shuffledArray.slice(0, 200);

      setWords(selectedWords);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!start) setStart(true);
    setInputWord(e.currentTarget.value);
    let text = e.currentTarget.value;

    if (e.currentTarget.value.split(" ").length > 1) {
      setWords(
        words.map((word, i) => {
          if (i == wordId)
            return {
              ...word,
              status:
                words[wordId].word.slice(0, text.length).trim() == text.trim()
                  ? 1
                  : -1,
            };
          return { ...word };
        })
      );
      setWordClass("");
      setWordId(wordId + 1);
      setInputWord("");
    } else {
      if (words[wordId].word.slice(0, text.length) != text)
        setWordClass("bg-red-500");
      else setWordClass("");
    }
  };

  useEffect(() => {
    getWords();
  }, []);
  

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full flex items-center justify-center">
      <div className="container">
        <Header />
        <div className="flex items-center justify-center flex-col mt-20">
          <div className="bg-white rounded-2xl w-full text-black flex  gap-2 p-4 text-xl overflow-scroll element">
            {words.map((word, i) => {
              return (
                <p
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className={`${
                    word.status == -1
                      ? "text-red-500"
                      : word.status == 1
                      ? "text-green-500"
                      : ""
                  } ${
                    wordId == i ? "bg-gray-300 " + wordClass : ""
                  } px-2 py-2 rounded-lg`}
                  key={i}
                >
                  {word.word}
                </p>
              );
            })}
          </div>
          <div className="flex items-center justify-center w-3/4 mt-10 gap-5">
            <input
              ref={inputRef}
              type="text"
              className="w-full p-5 text-xl outline-none text-white rounded-lg bg-[#00ADB5]"
              onChange={(e) => check(e)}
              value={inputWord}
            />
            <Timer start={start} setStart={setStart} />
            <button
              className="bg-[#eee] text-[#00ADB5] rounded-lg text-xl p-4 cursor-pointer hover:bg-[#00ADB5] hover:text-[#eee]"
              onClick={() => {
                setResult(words);
                setWordId(0);
                getWords();
                setInputWord("");
                setStart(false);
                setWordClass("");
              }}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
          {result.filter(el => el.status != 0).length != 0 && <Card words={result} />}
        </div>
      </div>
    </div>
  );
}
