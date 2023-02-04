import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import RoomsPage from "./pages/RoomsPage";
import MapsPage from "./pages/MapsPage";
import ContactPage from "./pages/ContactPage";
import GetStarted from "./pages/GetStartedPage";
import JoinClient from "./pages/JoinClient";
import JoinLandLord from "./pages/JoinLandLord";
import SignInPage from "./pages/SignInPage";
import LordView from "./pages/LordView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/rooms",
        element: <RoomsPage />,
      },
      {
        path: "/map",
        element: <MapsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/get-started",
        element: <GetStarted />,
      },
      {
        path: "/join-client",
        element: <JoinClient />,
      },
      {
        path: "/join-landlord",
        element: <JoinLandLord />,
      },
      {
        path: "/signIn",
        element: <SignInPage />,
      },
      {
        path: "/lord-view",
        element: <LordView />
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
