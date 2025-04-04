import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Preloader from "./preloader";
import Chatbot from "./chatbot";
import GoToTop from "./gototop"; // ✅ Import GoToTop

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Show preloader only on page reload
  useEffect(() => {
    setLoading(true);

    const MIN_LOAD_TIME = 3000;
    const startTime = performance.now();

    const handleLoad = () => {
      const elapsed = performance.now() - startTime;
      const delay = Math.max(0, MIN_LOAD_TIME - elapsed);

      requestAnimationFrame(() => setTimeout(() => setLoading(false), delay));
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (loading) return <Preloader />;

  return (
    <>
      <Outlet />
      <Chatbot />
      <GoToTop /> {/* ✅ Add it here */}
    </>
  );
};

export default App;
