import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "../footer";
import Header from "../header";
import BriefBg from "./briefbg-sec";
import CoreValue from "./coreval-sec";
import Council from "./council";
import VideoSec from "./video-sec";
function AboutPage() {
    return (_jsxs("div", { className: "about-page", children: [_jsx(Header, {}), _jsxs("div", { children: [_jsx(BriefBg, {}), _jsx(VideoSec, {}), _jsx(CoreValue, {}), _jsx(Council, {})] }), _jsx("div", { children: _jsx(Footer, {}) })] }));
}
export default AboutPage;
