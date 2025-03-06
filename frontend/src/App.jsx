// import { Route, Routes, Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/auth/Login";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Signup from "./pages/auth/Signup";
// import EmailVerification from "./pages/auth/VerifyEmail";
// import ResetPassword from "./pages/auth/ResetPassword";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
// import { getCurrentUser } from "./features/auth/AuthSlice";

// const App = () => {
//   const dispatch = useDispatch();
//   const { isLoading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, [dispatch]);

//   return (
//     <div className="">
//       <Navbar />
      
//       {isLoading && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       <Routes>
//         {/* Private routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/" element={<HomePage />} />
//         </Route>

//         {/* Public routes */}
//         <Route element={<PublicRoute />}>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot_password" element={<ForgotPassword />} />
//           <Route path="/reset_password/:token" element={<ResetPassword />} />
//           <Route path="/verify_email" element={<EmailVerification />} />
//         </Route>

//         {/* Catch all routes */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Signup from "./pages/auth/Signup";
import EmailVerification from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { getCurrentUser } from "./features/auth/AuthSlice";
import BlinkitLoader from "./components/BlinkitLoader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser()); 
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <BlinkitLoader onComplete={() => setLoading(false)} />
      ) : (
        <div>
          <Navbar />

          {/* Show a loader while fetching user authentication data */}
          {isLoading && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <Routes>
            {/* Private routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset_password/:token" element={<ResetPassword />} />
              <Route path="/verify_email" element={<EmailVerification />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      )}
    </>
  );
};

export default App;
