import { useContext, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { FirebaseContext } from "../context/Firebase";

const PrivateRoute = () => {
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
