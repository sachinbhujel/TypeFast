import { Link } from "react-router-dom";
import "./App.css";

function Practice() {
    return (
        <>
            <Link to="/" className="home-button">
                Back To Home
            </Link>
            <div className="practice-section">
                <h2 className="practice-heading">Practice Sets</h2>
                <p className="practice-description">
                    Choose a set below to start improving your typing skills.
                    More sets will be{" "}
                    <span className="coming-soon">added soon!</span>
                </p>

                <div className="practice-container">
                    <Link
                        to="/speedSets"
                        className="practice-box"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div>
                            <h3>Practice Set 1</h3>
                            <p>Improve your speed with this set.</p>
                        </div>
                    </Link>

                    <Link
                        to="/accuracySets"
                        className="practice-box"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div>
                            <h3>Practice Set 2</h3>
                            <p>Focus on accuracy with this set.</p>
                        </div>
                    </Link>

                    <div className="practice-box">
                        <h3>Practice Set 3</h3>
                        <p>Coming soon.</p>
                    </div>
                    <Link
                        to="/codingSets"
                        className="coming-soon-box"
                        style={{ textDecoration: "none" }}
                    >
                        <div>
                            <h3>Coding Sets</h3>
                            <p>This set is for coders.</p>
                        </div>
                    </Link>
                </div>
                <footer className="footer">
                    <div className="footer-content">
                        <p>
                            Made with ❤️ by the <b>TypeFast Team</b>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Practice;
