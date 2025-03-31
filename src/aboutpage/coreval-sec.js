import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./css/coreval.css";
import { useEffect, useState } from "react";
function CoreValue() {
    const [kapwa, setKapwa] = useState("Loading...");
    const [kalinangan, setKalinangan] = useState("Loading...");
    const [kaginhawaan, setKaginhawaan] = useState("Loading...");
    const [mission, setMission] = useState("Loading...");
    const [vision, setVision] = useState("Loading...");
    useEffect(() => {
        fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
            .then((res) => {
            if (!res.ok)
                throw new Error("Network error");
            return res.json();
        })
            .then((data) => {
            setKapwa(data.core_kapwa || "No data.");
            setKalinangan(data.core_kalinangan || "No data.");
            setKaginhawaan(data.core_kaginhawaan || "No data.");
            setMission(data.mission || "No data.");
            setVision(data.vision || "No data.");
        })
            .catch((err) => {
            console.error("Fetch error:", err);
            setKapwa("Failed to load.");
            setKalinangan("Failed to load.");
            setKaginhawaan("Failed to load.");
            setMission("Failed to load.");
            setVision("Failed to load.");
        });
    }, []);
    return (_jsxs("div", { className: "coreval-sec", children: [_jsxs("div", { className: "coreval-sec-content", children: [_jsx("h1", { className: "coreval-header", children: "Core Values" }), _jsxs("div", { className: "coreval-bg", children: [_jsx("img", { src: "./src/assets/aboutpage/coreval-cow-bg.png", alt: "Blogs Background" }), _jsx("div", { className: "coreval-content-1", children: _jsxs("div", { className: "coreval-container-1", children: [_jsx("h1", { className: "coreval-container-1-header", children: "Kapwa" }), _jsx("p", { className: "coreval-container-1-description", dangerouslySetInnerHTML: {
                                                __html: kapwa.replace(/\n/g, "<br />"),
                                            } })] }) }), _jsx("div", { className: "coreval-content-2", children: _jsxs("div", { className: "coreval-container-2", children: [_jsx("h1", { className: "coreval-container-2-header", children: "Kalinangan" }), _jsx("p", { className: "coreval-container-2-description", dangerouslySetInnerHTML: {
                                                __html: kalinangan.replace(/\n/g, "<br />"),
                                            } })] }) }), _jsx("div", { className: "coreval-content-3", children: _jsxs("div", { className: "coreval-container-3", children: [_jsx("h1", { className: "coreval-container-3-header", children: "Kaginhawaan" }), _jsx("p", { className: "coreval-container-3-description", dangerouslySetInnerHTML: {
                                                __html: kaginhawaan.replace(/\n/g, "<br />"),
                                            } })] }) })] })] }), _jsxs("div", { className: "mission-vision-sec", children: [_jsxs("div", { className: "mission-sec-content", children: [_jsx("h1", { className: "mission-header", children: "Mission" }), _jsx("p", { className: "mission-description", dangerouslySetInnerHTML: {
                                    __html: mission.replace(/\n/g, "<br />"),
                                } })] }), _jsxs("div", { className: "vision-sec-content", children: [_jsx("h1", { className: "vision-header", children: "Vision" }), _jsx("p", { className: "vision-description", dangerouslySetInnerHTML: {
                                    __html: vision.replace(/\n/g, "<br />"),
                                } })] })] })] }));
}
export default CoreValue;
