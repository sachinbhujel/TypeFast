import { Link } from "react-router-dom";
import "./App.css";

function About() {
    return (
        <>
            <Link to="/" className="home-button">
                Back To Home
            </Link>
            <div className="about-container">
                <h2>About TypeFast</h2>
                <h4>
                    <strong>TypeFast</strong> is a modern typing speed test
                    platform designed to help users improve their typing
                    accuracy and words per minute (WPM), whether you're a
                    student, professional, or just curious about your typing
                    skills. TypeFast offers a clean and responsive interface for
                    real-time feedback.
                </h4>
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
        </>
    );
}

export default About;
