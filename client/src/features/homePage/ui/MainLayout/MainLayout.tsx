import "./MainLayout.scss";

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="main-layout">
      {children}
    </div>
  );
};

export default MainLayout;
