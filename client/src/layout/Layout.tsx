import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="bg-light dark:bg-dark transition duration-500 min-h-[100vh]">
      
      <Navbar />

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}

    </div>
  );
};

export default Layout;
