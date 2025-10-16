import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./About";
import Practice from "./Practice";
import SpeedSets from "./SpeedSets";
import AccuracySets from "./AccuracySets";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="about" element={<About />} />
                <Route path="practice" element={<Practice />} />
                <Route path="speedSets" element={<SpeedSets />} />
                <Route path="accuracySets" element={<AccuracySets />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
