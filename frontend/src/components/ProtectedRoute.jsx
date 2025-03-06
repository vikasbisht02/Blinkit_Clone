import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from "react-redux";

const ProtectedRoute = () => {
  const { isVerified, isAuthenticated} = useSelector((state) => state.auth);

  if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

  return <Outlet />;
};

export default ProtectedRoute;
