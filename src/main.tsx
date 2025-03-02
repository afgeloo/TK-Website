import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./global-css/index.css";
import App from "./app";
import HomePage from "./homepage/homepage";
import EventsPage from "./eventspage/eventspage";
import AboutPage from "./aboutpage/aboutpage";
import ContactPage from "./contactpage/contactpage";
import BlogsPage from "./blogspage/blogspage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <HomePage /> },
      { path: "About", element: <AboutPage /> },
      { path: "Contact", element: <ContactPage /> },
      { path: "Events", element: <EventsPage /> },
      { path: "Blogs", element: <BlogsPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
