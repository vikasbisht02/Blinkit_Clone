import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/AuthSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]  = useState("")
  const { isLoading} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    dispatch(resetPassword({ userData: { password, confirmPassword }, token }))
      .unwrap()
      .then(() => {
        navigate("/login");
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
        <h2 className="text-md sm:text-xl font-bold text-gray-800 mt-2 text-center">
          Reset your password
        </h2>
        <p className="text-xs text-gray-700 mb-4 text-center">
          Enhance the security and privacy of your account by updating it with a
          new, strong password.
        </p>

        <form
          className="flex flex-col w-full space-y-3"
          onSubmit={handleResetPassword}
        >
          <input
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
            type="submit"
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
        </form>

        {/* Error Message */}
        {isLoading
          ? null
          : error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <p className="text-gray-700 mt-8">Back to login</p>
        <button
          className="w-full px-4 py-2 mb-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
