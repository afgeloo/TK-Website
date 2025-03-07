import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global-css/index.css";
import App from "./app"; 


const SingleBlog = lazy(() => import("./blogspage/singleblog"));

const HomePage = lazy(() => import("./homepage/homepage"));
const EventsPage = lazy(() => import("./eventspage/eventspage"));
const AboutPage = lazy(() => import("./aboutpage/aboutpage"));
const ContactPage = lazy(() => import("./contactpage/contactpage"));
const BlogsPage = lazy(() => import("./blogspage/blogspage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "events", element: <EventsPage /> },
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
