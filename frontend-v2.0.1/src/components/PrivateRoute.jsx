import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Spinner from "../components/Spinner"


const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) return children;

  return <Navigate to="/login" />;
};

export default PrivateRoute