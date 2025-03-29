import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider,Navigate  } from "react-router-dom";
import "./global-css/index.css";
import App from "./app"; 

const HomePage = lazy(() => import("./homepage/homepage"));
const EventsPage = lazy(() => import("./eventspage/eventspagehome"));
const AboutPage = lazy(() => import("./aboutpage/aboutpage"));
const ContactPage = lazy(() => import("./contactpage/contactpage"));
const BlogsPage = lazy(() => import("./blogspage/blogspage"));
const SingleBlog = lazy(() => import("./blogspage/singleblog"));
const EventDetails  = lazy(() => import("./eventspage/eventpage-details")); // dynamic route


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "events", element: <Navigate to="/events/page/1" /> },
      { path: "events/page/:page", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetails  /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "blog/:id", element: <SingleBlog /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
