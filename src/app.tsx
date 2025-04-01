import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Preloader from "./preloader";
import Chatbot from "./chatbot"; // adjust path if needed

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
  

  if (loading) return <Preloader />;

  return (
    <>
      <Outlet />
      <Chatbot /> {/* Global Chatbot visible on all pages */}
    </>
  );
};

export default App;
