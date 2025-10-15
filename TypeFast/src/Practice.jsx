import { Link } from "react-router-dom";
import "./App.css";

const practiceSetsData = [
    [
        "I wake up early in the morning. I brush my teeth and wash my face. I eat breakfast and drink water. Then I get ready to go outside. The day starts fresh and bright.",
        "I walk to school every day. I meet my friends on the way. We talk and laugh together. Teachers teach us new lessons. I enjoy learning and playing with friends at school.",
        "I eat lunch at home. My mother cooks rice, vegetables, and soup. I wash my hands before eating. I enjoy the food and feel full. Eating healthy food keeps me strong and happy.",
        "After school, I go outside to play. I run, jump, and play with my friends. We kick the ball and climb the trees. Playing makes me happy and full of energy.",
        "I like reading books every day. I read stories about animals, nature, and adventures. Reading teaches me new words. It is fun and helps me learn many things.",
        "I help my parents at home. I clean my room and wash the dishes. I also help water the plants. Helping my family makes me feel good and proud.",
        "I go to the market with my mother. We buy fruits, vegetables, and milk. People are busy shopping. I enjoy walking in the market and seeing colorful things everywhere.",
        "I sit in the garden and watch the birds. The sun shines, and the wind blows gently. Flowers are colorful. Nature looks beautiful. I feel calm and happy while sitting outside.",
        "In the evening, I take a bath and wear clean clothes. I eat dinner with my family. After that, I read a book or play a small game. Then I go to bed.",
        "I see the sky is blue today. Clouds move slowly, and birds fly above. The trees are green, and the air feels fresh. Everything looks nice and peaceful around me.",
    ],
];
console.log(practiceSetsData[0][0]);

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

                    <div className="practice-box">
                        <h3>Practice Set 2</h3>
                        <p>Focus on accuracy with this set.</p>
                    </div>

                    <div className="practice-box">
                        <h3>Practice Set 3</h3>
                        <p>Coming soon.</p>
                    </div>

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

export default Practice;
