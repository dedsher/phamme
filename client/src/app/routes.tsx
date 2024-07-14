import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "@features/auth/ui/Auth/Auth";
import Home from "@features/homePage/ui/Home/Home";
import ErrorPage from "@shared/ui/ErrorPage/ErrorPage";
import Later from "@shared/ui/Later/Later";
import ChatLayout from "@features/chat/ui/ChatLayout/ChatLayout";
import ChatEmpty from "@features/chat/ui/ChatEmpty/ChatEmpty";
import Chat from "@features/chat/ui/Chat/Chat";
import Verification from "@features/auth/ui/Verification/Verification";

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
          {
            path: "verification",
            element: <Verification />,
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
