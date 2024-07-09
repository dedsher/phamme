import Navbar from "@components/Navbar/Navbar";
import MainLayout from "@components/MainLayout/MainLayout";
import { Outlet } from "react-router-dom";
import "@sockets/socket";
import "./Home.scss";

const Home = () => {
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
