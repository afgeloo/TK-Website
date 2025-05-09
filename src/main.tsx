import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./global-css/index.css";
import App from "./app"; 
import AdminPage from "./adminpage/adminpage";
import AdminBlogs from "./adminpage/admin-blogs";
import AdminEvents from "./adminpage/admin-events";
import AdminSettings from "./adminpage/admin-settings";
import AdminLogin from "./adminpage/admin-login"; 
import RequireAuth from "./adminpage/requireauth";
const HomePage = lazy(() => import("./homepage/homepage"));
const EventsPage = lazy(() => import("./eventspage/eventspagehome"));
const AboutPage = lazy(() => import("./aboutpage1/aboutpage"));
const ContactPage = lazy(() => import("./contactpage/contactpage"));
const BlogsPage = lazy(() => import("./blogspage/blogspage"));
const SingleBlog = lazy(() => import("./blogspage/singleblog"));
const EventDetails  = lazy(() => import("./eventspage/eventpage-details")); 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "blog/:id", element: <SingleBlog /> },
    ],
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <RequireAuth />, 
    children: [
      {
        path: "",
        element: <AdminPage />,
        children: [
          { path: "blogs", element: <AdminBlogs /> },
          { path: "events", element: <AdminEvents /> },
          { path: "settings", element: <AdminSettings /> },
          { index: true, element: <Navigate to="blogs" /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
