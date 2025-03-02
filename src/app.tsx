import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Preloader from "./preloader";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    setLoading(true);

    const minLoadTime = 5000; // Minimum time for preloader (5s)
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, [location.pathname]); 

  return loading ? <Preloader /> : (
    <div>
      <Outlet /> {/* This will load the correct page */}
    </div>
  );
};

export default App;
