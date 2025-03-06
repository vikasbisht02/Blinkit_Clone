import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/auth/AuthSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { isLoading, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }))
      .unwrap()
      .then((res) => {
        console.log("Forgot Password Successful:", res);
        setEmail("");
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 m-10">
      <div className="w-full sm:w-96 px-10 bg-gray-200 flex flex-col justify-center items-center rounded-3xl shadow-lg relative">
          {/* Close Button */}
          <IoClose
          className="absolute top-3 right-3 text-xl cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Logo */}
        <img
          className="w-16 h-16 rounded-full mt-4"
          src="https://tse3.mm.bing.net/th?id=OIP.c5ds51WDHrLkgtLGg-VCiwHaHa&pid=Api&P=0&h=180"
          alt="blinkitPng"
        />

        <h2 className="text-md sm:text-xl font-bold text-gray-800 mt-2 text-center">
          Forgot your password
        </h2>
        <p className="text-xs text-gray-700 mt-2 text-center">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        <form
          className="flex flex-col w-full space-y-3"
          onSubmit={handleForgotPassword}
        >
          <input
            className="w-full px-3 py-2 mt-4 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
            type="submit"
          >
            {isLoading ? "Loading..." : "Send reset link"}
          </button>
        </form>
       {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
        {isLoading
          ? null
          : error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <p className="text-gray-700 mt-8">Back to login</p>
        <button
         className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200 mb-4 "
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
