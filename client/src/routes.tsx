import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "@pages/Auth/Auth";
import Home from "@pages/Home/Home";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import Later from "@pages/Later/Later";
import ChatLayout from "@components/Chat/ChatLayout/ChatLayout";
import ChatEmpty from "@components/Chat/ChatEmpty/ChatEmpty";
import Chat from "@components/Chat/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="signin" />,
          },
          {
            path: "signin",
            element: <Auth />,
          },
          {
            path: "signup",
            element: <Auth />,
          },
        ],
      },
      {
        path: "home",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="chats" />,
          },
          {
            path: "chats",
            element: <ChatLayout />,
            children: [
              {
                index: true,
                element: <ChatEmpty />,
              },
              {
                path: ":chatId",
                element: <Chat />,
              },
            ],
          },
          {
            path: "friends",
            element: <Later />,
          },
          {
            path: "transactions",
            element: <Later />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
