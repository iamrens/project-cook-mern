import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="bg-light dark:bg-dark px-[6%] transition duration-500">
      
      <Navbar />

      <main className="">
        <Outlet />
      </main>

      {/* <Footer /> */}

    </div>
  );
};

export default Layout;
