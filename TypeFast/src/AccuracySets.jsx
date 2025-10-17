import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import confetti from "canvas-confetti";
import { accuracyTextData } from "./data/data";

function AccuracySets() {
    const [word, setWord] = useState("");
    const [accuracy, setAccuracy] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [startingText, setStartingText] = useState(() => {
        return Math.floor(Math.random() * 20);
    });

    const [wordLimit, setWordLimit] = useState(null);
    const words_count = ["5", "15", "40"];

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
        if (isFinished) return;

        if (!e.target.value.trim()) return;

        const input = e.target.value;
        setWord(input);

        if (!startTime) {
            setStartTime(Date.now());
        }

        const targetWords = accuracyTextData[startingText].split(" ");
        const slicedTarget = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : accuracyTextData[startingText];

        let correctChar = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === slicedTarget[i]) {
                correctChar++;
            }
        }

        const acc = Math.round((correctChar / input.length) * 100) || 0;
        setAccuracy(acc);

        if (input.length === slicedTarget.length) {
            const end = Date.now();
            setTimeTaken(((end - startTime) / 1000).toFixed(2));
            setIsFinished(true);
        }
    };

    let error;
    const getHighlighted = () => {
        error = 0;
        const targetWords = accuracyTextData[startingText].split(" ");
        const slicedText = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : accuracyTextData[startingText];

        const inputChars = word.split("");
        const targetChars = slicedText.split("");
        return targetChars.map((char, index) => {
            const userChar = inputChars[index];
            const isLastTypedChar = index === inputChars.length - 1;

            if (userChar == null) {
                return (
                    <span key={index}>
                        {char}
                        {index === 0 && inputChars.length === 0 && (
                            <span className="blinking-cursor"></span>
                        )}
                    </span>
                );
            }
            const isCorrect = userChar === char;
            if (!isCorrect) error++;
            return (
                <span key={index} className={isCorrect ? "correct" : "wrong"}>
                    {char}

                    {isLastTypedChar && (
                        <span className="blinking-cursor"></span>
                    )}
                </span>
            );
        });
    };

    const handleRestart = () => {
        setWord("");
        setAccuracy(0);
        setStartTime(null);
        setTimeTaken(0);
        setIsFinished(false);
    };

    const handleNew = () => {
        let randomNum = Math.floor(Math.random() * accuracyTextData.length);
        setStartingText(randomNum);
        setWord("");
        setAccuracy(0);
        setStartTime(null);
        setTimeTaken(0);
        setIsFinished(false);
    };

    return (
        <>
            <Link to="/practice" className="home-button">
                Back To Home
            </Link>
            <div className="app" id="hs-run-on-click-run-confetti">
                <div className="typing-test">
                    <h2>Accuracy Set</h2>
                    <p className="typing-instructions">
                        Focus on typing the following text as{" "}
                        <strong>accurately</strong> as possible. Your typing
                        accuracy and error rate will be calculated in{" "}
                        <span style={{ color: "black", fontWeight: "600" }}>
                            real-time.
                        </span>
                    </p>

                    <div className="text-length">
                        {words_count.map((len, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        setWordLimit(Number(len));
                                        setWord("");
                                        setAccuracy(0);
                                        setStartTime(null);
                                        setTimeTaken(0);
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
                            <p className="stat-label">Time (sec)</p>
                            <p className="stat-value">{timeTaken}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-label">Errors</p>
                            <p className="stat-value">{error}</p>
                        </div>
                        <div className="stat-box">
                            <p className="stat-label">Accuracy (%)</p>
                            <p className="stat-value">{accuracy}</p>
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
                                Made with ❤️ by the{" "}
                                <a
                                    href="https://github.com/sachinbhujel"
                                    target="_blank"
                                    style={{ color: "black" }}
                                >
                                    <b>TypeFast Team</b>
                                </a>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default AccuracySets;
