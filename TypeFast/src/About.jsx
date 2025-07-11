import { Link } from "react-router-dom";
import "./App.css";

function About() {
    return (
        <>
            <Link to="/" className="home-button">Back To Home</Link>
            <div className="about-container">
                <h2>About TypeFast</h2>
                <p>
                    <strong>TypeFast</strong> is a modern typing speed test
                    platform designed to help users improve their typing
                    accuracy and words per minute (WPM). Whether you're a student, professional, or just curious
                    about your typing skills, TypeFast offers a clean and
                    responsive interface for real-time feedback.
                </p>
                <p>
                    Built with React.js, this platform calculates your typing
                    speed, accuracy, and time taken as you type. We also ensure
                    a fair test environment by preventing copy-paste inputs. More features like user profiles, leaderboards, and dark
                    mode are coming soon!
                </p>
                <p className="about-footer">
                    Made with ❤️ by the TypeFast Team.
                </p>
            </div>
        </>
    );
}

export default About;
