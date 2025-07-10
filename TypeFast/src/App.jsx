import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import "/public/github-logo.png";
import WebsiteOpen from "./WebsiteOpen";
import "./App.css";

function App() {
    const [word, setWord] = useState("");
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDisabled] = useState(true);
    const [fontName, setFontName] = useState("sans-serif");
    const [showWebsiteOpen, setShowWebsiteOpen] = useState(true);

    const handleSettings = () => {
        setIsSettingsOpen(true);
    };

    const [wordLimit, setWordLimit] = useState(null);

    const targetText =
        "The quick brown fox jumps over the lazy dog. This is a classic sentence used to test typing speed because it contains every letter of the alphabet. Try to type it accurately and quickly to see your words per minute (WPM) and accuracy.";

    const words_count = ["5", "10", "15", "20"];

    const handleValue = (e) => {
        if (isFinished) return;

        const input = e.target.value;
        setWord(input);

        if (!startTime) {
            setStartTime(Date.now());
        }

        const targetWords = targetText.split(" ");
        const slicedTarget = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : targetText;

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
        const targetWords = targetText.split(" ");
        const slicedText = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : targetText;

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

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsiteOpen(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

    return (
        <>
            {
                showWebsiteOpen ? (
                    <WebsiteOpen />
                ) : (
                    isSettingsOpen ? (
                <Settings
                    setIsSettingsOpen={setIsSettingsOpen}
                    setFontName={setFontName}
                />
            ) : (
                <div className="app">
                    <div className="navbar">
                        <div className="navbar-left">
                            <svg
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="logo"
                            >
                                <path
                                    d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <h3>TypeFast</h3>
                        </div>
                        <div className="navbar-right">
                            <Link to="/about">About</Link>
                            <Link to="/practice">Practice</Link>
                            {isDisabled ? (
                                <a href="#" style={{ color: "grey" }}>
                                    Leaderboard
                                </a>
                            ) : (
                                <Link to="/leaderboard">Leaderboard</Link>
                            )}

                            <span
                                className="material-symbols-outlined settings"
                                onClick={handleSettings}
                            >
                                settings
                            </span>
                        </div>
                        <div className="menu-div">
                            <a
                                href="https://github.com/Sachinbhujel/TypeFast"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://i.imgur.com/PshYMjN.png"
                                    alt="GitHub Repo"
                                />
                            </a>

                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </div>
                    </div>
                    <div className="typing-test">
                        <h2>Typing Speed Test</h2>
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
                                        onClick={() =>
                                            setWordLimit(Number(len))
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {len} /
                                    </p>
                                );
                            })}
                        </div>
                        <p
                            className="typing-text"
                            style={{ fontFamily: fontName }}
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
                                <p className="stat-label">WPM</p>
                                <p className="stat-value">{wpm}</p>
                            </div>
                            <div className="stat-box">
                                <p className="stat-label">Accuracy (%)</p>
                                <p className="stat-value">{accuracy}</p>
                            </div>
                        </div>

                        <button
                            className="restart-button"
                            onClick={handleRestart}
                        >
                            Restart
                        </button>
                        <footer className="footer">
                            <div className="footer-content">
                                <p>Made with ❤️ by the TypeFast Team</p>
                            </div>
                        </footer>
                    </div>
                </div>
            )
                )
            }
        </>
    );
}

export default App;
