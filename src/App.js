import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Outlet />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
