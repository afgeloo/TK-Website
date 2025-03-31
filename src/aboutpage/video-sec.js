import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactPlayer from "react-player";
import "./css/video-sec.css";
const VideoSec = () => {
    return (_jsxs("div", { className: "about-video-sec", children: [_jsx("div", { className: "about-video-description", children: _jsx("h1", { children: "Let\u2019s take a walk down memory lane to revisit where it all began" }) }), _jsx("div", { className: "about-video-container", children: _jsx("div", { className: "custom-video-frame", children: _jsx(ReactPlayer, { url: "https://www.facebook.com/TaraKabataanMNL/videos/330160250091186", controls: true, width: "100%", height: "100%" }) }) })] }));
};
export default VideoSec;
