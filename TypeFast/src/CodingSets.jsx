import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import confetti from "canvas-confetti";
import { codingTextData } from "./data/data";

function CodingSets() {
    const [word, setWord] = useState("");
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [startingText, setStartingText] = useState(() => {
        return Math.floor(Math.random() * 2);
    });
    const [wordLimit, setWordLimit] = useState(null);
    const words_count = ["5", "15", "40"];

    console.log(codingTextData);

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

        const input = e.target.value;
        setWord(input);

        if (!startTime) {
            setStartTime(Date.now());
        }

        const targetWords = codingTextData[startingText].split(" ");
        const slicedTarget = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : codingTextData[startingText];

        let correctChar = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === slicedTarget[i]) {
                correctChar++;
            }
        }

        const acc = Math.round((correctChar / input.length) * 100) || 0;
        setAccuracy(acc);

        const now = Date.now();
        const elapsedMs = startTime ? now - startTime : 0;
        const elapsedMinutes = elapsedMs / 1000 / 60;

        const wordsTyped = input.length / 5;
        const currentWpm =
            elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
        setWpm(currentWpm);

        if (input.length === slicedTarget.length) {
            const end = Date.now();
            setTimeTaken(((end - startTime) / 1000).toFixed(2));
            setIsFinished(true);
        }
    };

    const getHighlighted = () => {
        const targetWords = codingTextData[startingText].split(" ");
        const slicedText = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : codingTextData[startingText];

        const inputChars = word.split("");
        const targetChars = slicedText.split("");
        return targetChars.map((char, index) => {
            const userChar = inputChars[index];

            if (userChar == null) {
                return <span key={index}>{char}</span>;
            }

            const isCorrect = userChar === char;

            return (
                <span key={index} className={isCorrect ? "correct" : "wrong"}>
                    {char}
                </span>
            );
        });
    };

    const handleRestart = () => {
        setWord("");
        setAccuracy(0);
        setWpm(0);
        setStartTime(null);
        setTimeTaken(0);
        setIsFinished(false);
    };

    const handleNew = () => {
        let randomNum = Math.floor(Math.random() * codingTextData.length);
        setStartingText(randomNum);
        setWord("");
        setAccuracy(0);
        setWpm(0);
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
                    <h2>Coding Set</h2>
                    <p className="typing-instructions">
                        Type the following text as quickly and accurately as
                        possible. Your typing speed and accuracy will be
                        calculated in{" "}
                        <span style={{ color: "black", fontWeight: "600" }}>
                            real-time.
                        </span>
                    </p>
                    <div className="text-length">
                        {words_count.map((len, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => setWordLimit(Number(len))}
                                    style={{ cursor: "pointer" }}
                                >
                                    {len} /
                                </p>
                            );
                        })}
                    </div>
                    <pre
                        className="typing-text"
                        style={{
                            fontFamily: "sans-serif",
                            overflowX: "scroll",
                        }}
                    >
                        {getHighlighted()}
                    </pre>

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
                            <p className="stat-label">WPM</p>
                            <p className="stat-value">{wpm}</p>
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
                                Made with ❤️ by the <b>TypeFast Team</b>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default CodingSets;
