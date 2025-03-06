import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../features/auth/AuthSlice";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Allow only numeric input
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input field if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData
      .getData("Text")
      .slice(0, 6)
      .replace(/\D/g, "");
    const newCode = pasteData.split("");
    setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
    inputRefs.current[Math.min(pasteData.length - 1, 5)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");

    dispatch(verifyEmail({ code: enteredCode }))
      .unwrap()
      .then(() => {
        toast.success("Signup successfully");
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  // Autofocus on the first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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
          Verify Your Email
        </h2>
        <p className="text-xs text-gray-700 mt-2 text-center">
          Enter the 6-digit code sent to your email address.
        </p>

        <form className="flex flex-col w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="flex flex-row" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full px-3 py-2 mt-8 mr-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                type="text"
                maxLength="1"
                required
              />
            ))}
          </div>
          <button
            className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
            type="submit"
          >
            {isLoading ? "Verifying your email..." : "Continue"}
          </button>
        </form>
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

export default VerifyEmail;
