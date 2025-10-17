export default function Settings({
    setIsSettingsOpen,
    setFontName,
    setSideNavOpen,
}) {
    const fonts = [
        "sans-serif",
        "Cursive",
        "fantasy",
        "monospace",
        "emoji",
        "system-ui",
        "serif",
    ];

    const handleBackSettings = () => {
        setIsSettingsOpen(false);
    };

    const handleFontName = (index) => {
        setFontName(fonts[index]);
        setIsSettingsOpen(false);
        setSideNavOpen(false);
    };
    return (
        <>
            <div className="setting-div">
                <button className="home-button" onClick={handleBackSettings}>
                    Back To Home
                </button>
                <div className="font-family-div">
                    <h1>Font Family</h1>
                    <div className="font-div">
                        {fonts.map((font_family, index) => {
                            return (
                                <p
                                    key={index}
                                    className="font-family-name"
                                    onClick={() => handleFontName(index)}
                                >
                                    {font_family}
                                </p>
                            );
                        })}
                    </div>
                </div>
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
