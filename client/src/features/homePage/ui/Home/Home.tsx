import Navbar from "@features/navigation/ui/Navbar/Navbar";
import MainLayout from "@features/homePage/ui/MainLayout/MainLayout";
import { Outlet } from "react-router-dom";
import useSocket from "@shared/sockets/socket";
import "./Home.scss";
import { useEffect } from "react";
import { useUserId } from "@entities/user/hooks/useUserId";

const Home = () => {
  const userId = useUserId();
  const socket = useSocket()!;
  
  useEffect(() => {
    socket.emit("user connected", userId);
  }, []);

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
