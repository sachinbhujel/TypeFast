import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import confetti from "canvas-confetti";

function App() {
    const [word, setWord] = useState("");
    const [wpm, setWpm] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const targetText = [
        "The sun is bright today. I go outside and play. Birds sing and children run. Flowers are colorful. I feel happy and smile. The day is warm and nice.",
        "I have a small cat. It runs in the garden. It likes to eat and sleep. I give it water and food every day. I love my cat.",
        "I go to school every day. I see my friends there. We play games and learn new things. Teachers help us. School is fun and I like it.",
        "I like to read books. I read before bed. Stories are fun and easy. I enjoy learning new words. Books make me happy every day.",
        "The sky is blue today. Clouds are white and soft. The sun is warm. I like to walk and see birds flying in the sky.",
        "I eat breakfast in the morning. I drink milk and eat bread. Then I brush my teeth. After that, I go outside to play with my friends.",
        "I like drawing and coloring. I use pencils and crayons. I draw flowers, trees, and animals. Drawing makes me happy. I show my pictures to my friends.",
        "I have a small dog. It runs and plays in the garden. I give it food and water. My dog is happy and I love it very much.",
        "The rain is falling. Water flows on the road. People use umbrellas. I like to watch the rain and listen to the sound. It feels calm and nice.",
        "I walk in the park every day. I see trees, flowers, and birds. I feel fresh and happy. Playing outside is fun. The park is big and green.",
    ];
    const [startingText, setStartingText] = useState(() => {
        return Math.floor(Math.random() * 10);
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

        const input = e.target.value;
        setWord(input);

        if (!startTime) {
            setStartTime(Date.now());
        }

        const targetWords = targetText[startingText].split(" ");
        const slicedTarget = wordLimit
            ? targetWords.slice(0, wordLimit).join(" ")
            : targetText[startingText];

        const now = Date.now();
        const elapsedMs = startTime ? now - startTime : 0;
        const elapsedMinutes = elapsedMs / 1000 / 60;

        const wordsTyped = input.length / 5;
        const currentWpm =
            elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
        setWpm(currentWpm);

        if (input.length === slicedTarget.length) {
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
        setWpm(0);
        setStartTime(null);
        setIsFinished(false);
    };

    const handleNew = () => {
        let randomNum = Math.floor(Math.random() * targetText.length);
        setStartingText(randomNum);
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
                                    onClick={() => setWordLimit(Number(len))}
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

export default App;
