import "./Home.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@features/navigation/ui/Navbar/Navbar";
import MainLayout from "@features/homePage/ui/MainLayout/MainLayout";
import { useSocket } from "@shared/sockets/socketContext";
import { useUserId } from "@entities/user/hooks/useUserId";
import useUser from "@entities/user/hooks/useUser";

const Home = () => {
  const userId = useUserId();
  const socket = useSocket();
  useUser(userId);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsSocketInitialized(true);
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketInitialized) {
      socket?.connect();

      // return () => {
      //   socket?.disconnect();
      // };
    }
  }, [isSocketInitialized, userId]);

  return (
    <div className="home">
      <Navbar />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
};

export default Home;
