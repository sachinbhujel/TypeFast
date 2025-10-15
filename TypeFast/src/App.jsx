import React, { useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import "/public/github-logo.png";
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
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const targetText = [
        "The quick brown fox jumps over the lazy dog. This is a classic sentence used to test typing speed because it contains every letter of the alphabet. Try to type it accurately and quickly to see your words per minute (WPM) and accuracy.",
        "The sun shines bright over the green hills. Birds sing softly in the trees while children play near the park. Everyone smiles as the cool breeze flows gently.",
        "Tom loves to read books every night before bed. His favorite stories are about magic and adventure. Reading makes him happy and helps him dream of new worlds.",
        "A small cat sleeps under the warm sunlight. The garden is full of flowers and bees buzzing around. It is a calm and peaceful afternoon in the village.",
        "Coding is like solving a puzzle every day. Each line of code builds something new and exciting. With patience and creativity, developers can turn ideas into working projects.",
        "The website loads fast and looks clean on every device. Designers and developers work together to make sure users enjoy every click, scroll, and moment on the screen.",
        "Learning JavaScript opens many doors for web development. It allows you to create interactive pages, connect to APIs, and build apps that work smoothly across browsers and devices.",
        "Modern developers focus on scalability, performance, and design. Frameworks like React or Next.js simplify workflow while maintaining flexibility. Efficient code ensures faster delivery and long-term maintainability.",
        "Building complex applications requires deep understanding of architecture and performance optimization. Every function, loop, and request impacts how fast and reliable the software feels to its users.",
        "Asynchronous programming helps manage multiple tasks without blocking execution. Mastering this concept is key for creating efficient, high-performance web applications that can handle large data streams in real time.",
        "From simple ideas to advanced designs, every project starts with a single line of code. Developers imagine, build, test, and refine until the final version feels just right.",
    ];
    const [startingText] = useState(() => {
        return Math.floor(Math.random() * 10);
    });

    const handleMenu = () => {
        setSideNavOpen(true);
    };

    const handleCloseSideNav = () => {
        setSideNavOpen(false);
    };

    const handleSettings = () => {
        setIsSettingsOpen(true);
    };

    const [wordLimit, setWordLimit] = useState(null);
    const words_count = ["5", "15", "40"];

    const handleValue = (e) => {
        if (isFinished) return;

        const input = e.target.value;
        setWord(input);

        if (!startTime) {
            setStartTime(Date.now());
        }

        const targetWords = targetText[startingText].split(" ");
        const slicedTarget = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : targetText[startingText];

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
        const targetWords = targetText[startingText].split(" ");
        console.log("targetWords", targetWords);
        const slicedText = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : targetText[startingText];
        console.log("Sliced text", slicedText);

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

    return (
        <>
            {sideNavOpen ? (
                <div className="side-nav-div">
                    <span
                        className="material-symbols-outlined close"
                        onClick={handleCloseSideNav}
                    >
                        close
                    </span>
                    <Link
                        to="/about"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            fontSize: "20px",
                            fontFamily: "sans-serif",
                        }}
                    >
                        About
                    </Link>
                    <Link
                        to="/practice"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            fontSize: "20px",
                            fontFamily: "sans-serif",
                        }}
                    >
                        Practice
                    </Link>
                    {isDisabled ? (
                        <a
                            href="#"
                            style={{
                                color: "grey",
                                fontSize: "20px",
                                fontFamily: "sans-serif",
                                textDecoration: "none",
                            }}
                        >
                            Ranks
                        </a>
                    ) : (
                        <Link
                            to="/leaderboard"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "20px",
                                fontFamily: "sans-serif",
                            }}
                        >
                            Leaderboard
                        </Link>
                    )}
                    <span
                        className="material-symbols-outlined settings"
                        onClick={handleSettings}
                    >
                        settings
                    </span>
                </div>
            ) : (
                ""
            )}
            {isSettingsOpen ? (
                <Settings
                    setIsSettingsOpen={setIsSettingsOpen}
                    setFontName={setFontName}
                    setSideNavOpen={setSideNavOpen}
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

                            <span
                                className="material-symbols-outlined"
                                onClick={handleMenu}
                            >
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
                                <p>
                                    Made with ❤️ by the <b>TypeFast Team</b>
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
