import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/AuthPage/Auth";
import Home from "./pages/HomePage/HomePage";
import FirebaseProvider from "./context/Firebase";
import PrivateRoute from "./route/PrivateRoute";
import User from "./pages/UserPage/User";
import Profile from "./pages/ProfilePage/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "users",
            element: <User />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={appRouter} />
    </FirebaseProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
