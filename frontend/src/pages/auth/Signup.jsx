import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { signupUser } from "../../features/auth/AuthSlice";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const userData = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signupUser(userData))
      .unwrap()
      .then(() => {
        navigate("/verify_email");
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 m-10">
      <div className="w-full sm:w-96 px-8 bg-gray-200 flex flex-col justify-center items-center rounded-3xl shadow-lg relative">
        <IoClose
          className="absolute top-3 right-3 text-xl cursor-pointer"
          onClick={() => navigate("/")}
        />
        <img
          className="w-16 h-16 rounded-full mt-2"
          src="https://tse3.mm.bing.net/th?id=OIP.c5ds51WDHrLkgtLGg-VCiwHaHa&pid=Api&P=0&h=180"
          alt="blinkitPng"
        />
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2 text-center">
          India&apos;s last minute app
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          Log in or Sign up
        </p>
        <form
          className="flex flex-col w-full space-y-3"
          onSubmit={handleSignup}
        >
          <div className="flex flex-row justify-center items-center gap-1 mt-2">
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="First name"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Last name"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
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
          <input
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            type="password"
            placeholder="Confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
            type="submit"
          >
            {isLoading ? "Signing up..." : "Continue"}
          </button>
        </form>
        {isLoading
          ? null
          : error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <p className="text-gray-700 mt-4">Already have an account</p>
        <button
          className="w-full px-4 py-2 mt-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={() => navigate("/login")}
        >
          Log in
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

export default Signup;
