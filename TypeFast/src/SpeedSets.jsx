import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import confetti from "canvas-confetti";
import { speedTextData } from "./data/data";

function SpeedSets() {
    const [word, setWord] = useState("");
    const [wpm, setWpm] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [startingText, setStartingText] = useState(() => {
        return Math.floor(Math.random() * 10);
    });

    const [wordLimit, setWordLimit] = useState(null);
    const words_count = ["5", "15", "40"];
    const [userWordsCount, setUserWordsCount] = useState(0);
    const [highestWpm, setHighestWpm] = useState(0);

    useEffect(() => {
        setHighestWpm(localStorage.getItem("highest-wpm") || 0);
    }, []);

    useEffect(() => {
        if (isFinished) {
            const runConfetti = document.querySelector(
                "#hs-run-on-click-run-confetti"
            );
            if (runConfetti) {
                confetti({
                    particleCount: 200,
                    spread: 70,
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                    shapes: ["circle", "square"],
                    resize: true,
                });
            }
        }
    }, [isFinished]);

    const handleValue = (e) => {
        const userWords = e.target.value.trim();
        const wordCounts = userWords.split(" ").filter((word) => word);
        setUserWordsCount(wordCounts.length);
        if (isFinished) return;

        if (!e.target.value.trim()) return;

        const input = e.target.value;
        setWord(input);

        if (!startTime) {
            setStartTime(Date.now());
        }

        const targetWords = speedTextData[startingText].split(" ");
        const slicedTarget = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : speedTextData[startingText];

        const now = Date.now();
        const elapsedMs = startTime ? now - startTime : 0;
        const elapsedMinutes = elapsedMs / 1000 / 60;

        const wordsTyped = input.length / 5;
        const currentWpm =
            elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
        setWpm(currentWpm);

        if (input.length === slicedTarget.length) {
            setIsFinished(true);
            if (wpm > highestWpm) {
                localStorage.setItem("highest-wpm", wpm);
            }
        }
    };

    const getHighlighted = () => {
        const targetWords = speedTextData[startingText].split(" ");
        const slicedText = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : speedTextData[startingText];

        const inputChars = word.split("");
        const targetChars = slicedText.split("");
        return targetChars.map((char, index) => {
            const userChar = inputChars[index];

            if (userChar == null) {
                return <span key={index}>{char}</span>;
            }

            const isCorrect = userChar === char;

            return (
                <span key={index} className={`showing-words${isCorrect ? "correct" : "wrong"}`}>
                    {char}
                </span>
            );
        });
    };

    const handleRestart = () => {
        setWord("");
        setWpm(0);
        setStartTime(null);
        setIsFinished(false);
    };

    const handleNew = () => {
        let randomNum = Math.floor(Math.random() * speedTextData.length);
        setStartingText(randomNum);
        setWord("");
        setWpm(0);
        setStartTime(null);
        setUserWordsCount(0);
        setIsFinished(false);
    };

    return (
        <>
            <Link to="/practice" className="home-button">
                Back To Home
            </Link>
            <div className="app" id="hs-run-on-click-run-confetti">
                <div className="typing-test">
                    <h2>Speed Set</h2>
                    <p className="typing-instructions">
                        Type the sentences below as fast as you can. Your typing
                        speed will be measured{" "}
                        <span style={{ color: "black", fontWeight: "600" }}>
                            live
                        </span>
                        . Focus on continuous typing and try to complete all
                        sentences quickly without stopping.
                    </p>

                    <div className="text-length">
                        {words_count.map((len, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        setWordLimit(Number(len));
                                        setWpm(0);
                                        setWord("");
                                        setStartTime(null);
                                        setIsFinished(false);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    {len} /
                                </p>
                            );
                        })}
                    </div>
                    <p
                        className="typing-text"
                        style={{ fontFamily: "sans-serif" }}
                    >
                        {getHighlighted()}
                    </p>

                    <textarea
                        className="typing-input"
                        placeholder="Start typing here..."
                        value={word}
                        onChange={handleValue}
                        disabled={isFinished}
                        onPaste={(e) => e.preventDefault()}
                    ></textarea>

                    <div className="typing-stats">
                        <div className="stat-box">
                            <p className="stat-label">WPM</p>
                            <p className="stat-value">{wpm}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-label">Words</p>
                            <p className="stat-value">{userWordsCount}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-label">Highest WPM</p>
                            <p className="stat-value">{highestWpm}</p>
                        </div>
                    </div>

                    <div className="restart-new-div">
                        <button
                            className="restart-button"
                            onClick={handleRestart}
                        >
                            Restart
                        </button>
                        <button className="new-one-button" onClick={handleNew}>
                            New one
                        </button>
                    </div>
                    <footer className="footer">
                        <div className="footer-content">
                            <p>
                                Made with ❤️ by the <b>TypeFast Team</b>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default SpeedSets;
