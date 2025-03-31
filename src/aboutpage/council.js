import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./css/council.css";
import { useEffect, useState } from "react";
function Council() {
    const [councilData, setCouncilData] = useState([]);
    const [councilText, setCouncilText] = useState("Loading...");
    useEffect(() => {
        // Fetch council description
        fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
            .then(res => res.json())
            .then(data => {
            setCouncilText(data.council || "No data.");
        });
        // Fetch council members
        fetch("http://localhost/tara-kabataan-webapp/backend/api/council.php")
            .then(res => res.json())
            .then(data => setCouncilData(data))
            .catch(err => console.error("Council API error:", err));
    }, []);
    return (_jsxs("div", { className: "council-sec", children: [_jsx("div", { className: "council-ribbon", children: _jsx("img", { src: "./src/assets/aboutpage/council-ribbon.png", alt: "ribbon" }) }), _jsxs("div", { className: "council-sec-content", children: [_jsx("h1", { className: "council-header", children: "Council" }), _jsx("p", { className: "council-description", dangerouslySetInnerHTML: { __html: councilText.replace(/\n/g, "<br />") } })] }), _jsx("div", { className: "council-president-grid", children: councilData
                    .filter(member => member.role_name === "President")
                    .map((member, index) => (_jsx("div", { className: "council-card council-card-main", children: _jsx("div", { className: "council-inner-card-1-president", children: _jsxs("div", { className: "council-inner-card-2", children: [_jsx("div", { className: "council-member-image", children: _jsx("img", { src: member.user_image || "./src/assets/aboutpage/img-placeholder-guy.png", onError: (e) => {
                                            e.currentTarget.src = "./src/assets/aboutpage/img-placeholder-guy.png";
                                        }, alt: "./src/assets/aboutpage/img-placeholder-guy.png" }) }), _jsx("h1", { className: "council-member-name", children: member.user_name }), _jsx("p", { className: "council-member-role", children: member.role_name })] }) }) }, index))) }), _jsx("div", { className: "council-grid", children: councilData
                    .filter(member => member.role_name !== "President")
                    .map((member, index) => (_jsx("div", { className: "council-card", children: _jsx("div", { className: "council-inner-card-1-members", children: _jsxs("div", { className: "council-inner-card-2", children: [_jsx("div", { className: "council-member-image", children: _jsx("img", { src: member.user_image || "./src/assets/aboutpage/img-placeholder-guy.png", onError: (e) => {
                                            e.currentTarget.src = "./src/assets/aboutpage/img-placeholder-guy.png";
                                        }, alt: "./src/assets/aboutpage/img-placeholder-guy.png" }) }), _jsx("h1", { className: "council-member-name", children: member.user_name }), _jsx("p", { className: "council-member-role", children: member.role_name })] }) }) }, index))) })] }));
}
export default Council;
