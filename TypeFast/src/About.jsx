import { Link } from "react-router-dom";
import "./App.css";

function About() {
    return (
        <>
            <Link to="/" className="home-button">Back To Home</Link>
            <div className="about-container">
                <h1>About TypeFast</h1>
                <p>
                    <strong>TypeFast</strong> is a modern typing speed test
                    platform designed to help users improve their typing
                    accuracy and words per minute (WPM).
                </p>
            </div>
        </>
    );
}

export default About;
