import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global-css/index.css'
import UserSide from './user-side'
import EventsPage from './eventspage/eventspage'
import AboutPage from './aboutpage/aboutpage'
import ContactPage from './contactpage/contactpage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import BlogsPage from './blogspage/blogspage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserSide />,
  },
  {
    path: "About",
    element: <AboutPage />,
  },
  {
    path: "Contact",
    element: <ContactPage />,
  },
  {
    path: "Events",
    element: <EventsPage />,
  },
  {
    path: "Blogs",
    element: <BlogsPage />,
  },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
