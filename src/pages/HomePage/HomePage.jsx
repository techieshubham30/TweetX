import { Button } from "react-bootstrap";
import Navigation from "../../component/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Home;
