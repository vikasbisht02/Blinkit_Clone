import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from "react-redux";

const PublicRoute = () => {
  const {isVerified, isAuthenticated} = useSelector((state) => state.auth);

  if (isAuthenticated && isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
