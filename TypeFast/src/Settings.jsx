export default function Settings({ setIsSettingsOpen }) {
    const fonts = [
        "Arial",
        "Helvetica",
        "Times New Roman",
        "Courier New",
        "Georgia",
    ];

    const handleBackSettings = () => {
        setIsSettingsOpen(false);
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
                            return <p key={index}>{font_family}</p>;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
