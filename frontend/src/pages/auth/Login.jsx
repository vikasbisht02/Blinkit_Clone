import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/AuthSlice";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = { email, password };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(userData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 m-10">
      <div className="w-full sm:w-96 px-8 bg-gray-200 flex flex-col justify-center items-center rounded-3xl shadow-lg relative">
        
        {/* Close Button */}
        <IoClose
          className="absolute top-3 right-3 text-xl cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Logo */}
        <img
          className="w-16 h-16 rounded-full mt-2"
          src="https://tse3.mm.bing.net/th?id=OIP.c5ds51WDHrLkgtLGg-VCiwHaHa&pid=Api&P=0&h=180"
          alt="blinkitPng"
        />

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2 text-center">
          India&apos;s last minute app
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          Log in or Sign up
        </p>

        {/* Form */}
        <form className="flex flex-col w-full space-y-3" onSubmit={handleLogin}>
          <input
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p
            onClick={() => navigate("/forgot_password")}
            className="text-gray-700 text-sm cursor-pointer hover:underline"
          >
            Forgot your password?
          </p>

          {/* Submit Button */}
          <button
            className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
            type="submit"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </form>

        {/* Error Message */}
        {isLoading
          ? null
          : error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {/* Sign Up */}
        <p className="text-gray-700 mt-4">Create a new account</p>
        <button
          className="w-full px-4 py-2 mt-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>

        
        <button className="flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <FcGoogle className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

       
        <p className="text-[10px] text-gray-600 mt-3 text-center">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
