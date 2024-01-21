import { Button } from "react-bootstrap";
import Navigation from "../../component/NavBar";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Home;
