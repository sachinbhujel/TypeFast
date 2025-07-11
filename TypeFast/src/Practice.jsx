import { Link } from "react-router-dom";
import "./App.css";

const practiceSets = [
    {
        id: 1,
        title: "Practice Set 1",
        description: "Improve your speed with this set.",
    },
    {
        id: 2,
        title: "Practice Set 2",
        description: "Focus on accuracy with this set.",
    },
    { id: 3, title: "Practice Set 3", description: "Coming soon!" },
];

function PracticeSets() {
    return (
        <>
            <Link to="/" className="home-button">
                Back To Home
            </Link>
            <div className="practice-section">
                <h2 className="practice-heading">Practice Sets</h2>
                <p className="practice-description">
                    Choose a set below to start improving your typing skills.
                    More sets will be <span className="coming-soon">added soon!</span>
                </p>

                <div className="practice-container">
                    {practiceSets.map((set) => (
                        <div key={set.id} className="practice-box">
                            <h3>{set.title}</h3>
                            <p>{set.description}</p>
                        </div>
                    ))}

                    <div className="coming-soon-box">
                        <h3>More Sets</h3>
                        <p>Coming soon!</p>
                    </div>
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

export default PracticeSets;
