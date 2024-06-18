import Navbar from "@components/Navbar/Navbar";
import MainLayout from "@components/MainLayout/MainLayout";
import "./Home.scss";
import { Outlet } from "react-router-dom";

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
