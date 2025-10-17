import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import "/public/github-logo.png";
import "./App.css";
import confetti from "canvas-confetti";
import { targetText } from "./data/data";

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
    const [startingText, setStartingText] = useState(() => {
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

    // const handleValue = (e) => {
    //     if (isFinished) return;

    //     // if (!e.target.value.trim()) return;

    //     const input = e.target.value;
    //     setWord(input);

    //     if (!startTime) {
    //         setStartTime(Date.now());
    //     }

    //     const targetWords = targetText[startingText].split(" ");
    //     const slicedTarget = wordLimit
    //         ? targetWords.slice(0, wordLimit).join(" ")
    //         : targetText[startingText];

    //     let correctChar = 0;
    //     for (let i = 0; i < input.length; i++) {
    //         if (input[i] === slicedTarget[i]) {
    //             correctChar++;
    //         }
    //     }

    //     const acc = Math.round((correctChar / input.length) * 100) || 0;
    //     setAccuracy(acc);

    //     const now = Date.now();
    //     const elapsedMs = startTime ? now - startTime : 0;
    //     const elapsedMinutes = elapsedMs / 1000 / 60;

    //     const wordsTyped = input.length / 5;
    //     const currentWpm =
    //         elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
    //     setWpm(currentWpm);

    //     if (input.length === slicedTarget.length) {
    //         const end = Date.now();
    //         setTimeTaken(((end - startTime) / 1000).toFixed(2));
    //         setIsFinished(true);
    //     }
    // };

    //  useEffect(() => {

    //     alert("Our website is currently under maintenance. Thanks for your patience.");
    //  }, [])

    useEffect(() => {
        let typed = "";
        const handleKeyDown = (e) => {
            const key = e.key;
            if (isFinished) return;

            if (!startTime) {
                setStartTime(Date.now());
            }

            if (key.length == 1 || key === "Backspace") {
                if (key === "Backspace") {
                    typed = typed.slice(0, -1);
                } else {
                    typed += key;
                }
                setWord(typed);

                const targetWords = targetText[startingText].split(" ");
                const slicedTarget = wordLimit
                    ? targetWords.slice(0, wordLimit).join(" ")
                    : targetText[startingText];

                let correctChar = 0;
                for (let i = 0; i < typed.length; i++) {
                    if (typed[i] === slicedTarget[i]) {
                        correctChar++;
                    }
                }
                const acc = Math.round((correctChar / typed.length) * 100) || 0;
                setAccuracy(acc);

                const now = Date.now();
                const elapsedMs = startTime ? now - startTime : 0;
                const elapsedMinutes = elapsedMs / 1000 / 60;

                const wordsTyped = typed.length / 5;
                const currentWpm =
                    elapsedMinutes > 0
                        ? Math.round(wordsTyped / elapsedMinutes)
                        : 0;
                setWpm(currentWpm);

                if (typed.length === slicedTarget.length) {
                    const end = Date.now();
                    setTimeTaken(((end - startTime) / 1000).toFixed(2));
                    setIsFinished(true);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isFinished, startTime, startingText, wordLimit]);

    const getHighlighted = () => {
        const targetWords = targetText[startingText].split(" ");
        const slicedText = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : targetText[startingText];

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
        let randomNum = Math.floor(Math.random() * targetText.length);
        setStartingText(randomNum);
        setWord("");
        setAccuracy(0);
        setWpm(0);
        setStartTime(null);
        setTimeTaken(0);
        setIsFinished(false);
    };

    const handleTyping = () => {
        const input = document.getElementById("typing-div");
        if (!input) return;
        input.focus();
        input.click();
    };

    // window.addEventListener("load", () => {
    //     const input = document.getElementById("typing-div");
    //     if (!input) return;

    //     setTimeout(() => {
    //         input.focus();
    //         input.click();
    //     }, 300);
    // });

    useEffect(() => {
        alert(
            "Our website is currently under maintenance. Thanks for your patience."
        );
    }, []);
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
                    <div
                        onClick={handleSettings}
                        style={{
                            color: "white",
                            textDecoration: "none",
                            fontSize: "20px",
                            fontFamily: "sans-serif",
                            cursor: "pointer",
                        }}
                    >
                        <p>Settings</p>
                    </div>
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
                <div className="app" id="hs-run-on-click-run-confetti">
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
                        <label id="typing-div" onClick={handleTyping}>
                            <p
                                className="typing-text"
                                style={{ fontFamily: fontName }}
                                id="typing-div"
                            >
                                {getHighlighted()}
                            </p>
                        </label>
                        <input id="typing-div" type="text" hidden />

                        {/* <button
                                className="start-button"
                                onClick={handleTyping}
                            >
                                Start typing
                            </button> */}

                        {/* <textarea
                            className="typing-input"
                            placeholder="Start typing here..."
                            value={word}
                            onChange={handleValue}
                            disabled={isFinished}
                            onPaste={(e) => e.preventDefault()}
                        ></textarea> */}

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
                            <button
                                className="new-one-button"
                                onClick={handleNew}
                            >
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
            )}
        </>
    );
}

export default App;
