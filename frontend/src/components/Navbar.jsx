import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const searchBarRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchBarOpen) {
      searchBarRef.current?.focus();
    }
  }, [isSearchBarOpen]);

  const handleOpenSearchBar = () => setIsSearchBarOpen(true);
  const handleCloseSearchBar = () => setIsSearchBarOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="h-16 flex items-center justify-between px-4 md:px-8 bg-gray-100">
      <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-400">
        blink<span className="text-green-400">it</span>
      </h2>

      <div className="hidden md:block text-center">
        <h2 className="text-sm md:text-lg font-bold">Delivery in 11 minutes</h2>
        <h3 className="text-xs md:text-sm text-gray-700">Dehradun, Uttarakhand</h3>
      </div>

      <div className="flex items-center gap-2">
        {!isSearchBarOpen && (
          <div className="flex items-center gap-2">
            <CiSearch onClick={handleOpenSearchBar} className="cursor-pointer text-xl" />
            <input
              type="search"
              placeholder="Search your food"
              className="hidden md:block w-64 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={handleOpenSearchBar}
            />
          </div>
        )}
        {isSearchBarOpen && (
          <input
            type="search"
            ref={searchBarRef}
            autoFocus
            onBlur={handleCloseSearchBar}
            placeholder="Search your food"
            className="w-48 md:w-96 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        )}
      </div>

      <button
        onClick={handleLogout}
        className="text-sm md:text-xl px-4 py-2 bg-transparent rounded-md cursor-pointer"
      >
        {user ? "Logout" : "Login"}
      </button>

      <div className="flex gap-2 items-center h-10 px-4 md:px-5 py-2 bg-green-600 rounded-md">
        <AiOutlineShoppingCart className="text-lg md:text-xl" />
        <h4 className="text-xs md:text-sm font-bold">Cart</h4>
      </div>
    </nav>
  );
};

export default Navbar;
