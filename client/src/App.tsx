import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Auth from "@pages/Auth/Auth";
import Home from "@pages/Home/Home";
// import Friends from "@pages/Friends/Friends";
// import Transactions from "@pages/Transactions/Transactions";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import Later from "@pages/Later/Later";
import ChatLayout from "@components/Chat/ChatLayout/ChatLayout";
import Chat from "@components/Chat/Chat/Chat";
import ChatEmpty from "@components/Chat/ChatEmpty/ChatEmpty";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="signup" />,
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
    path: "/home",
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
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="main">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
