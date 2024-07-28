import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import logo from "../../images/tastybyte.png";
import UserContext from "../../utils/UserContext";
import shoppingcart from "../../images/shopping-cart.png";
import { useSelector } from "react-redux";

export const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Logout");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserName(""); // Clear the username context (assuming setUserName exists in context)
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-white items-center p-4">
      <div className="logo-container">
        <img className="w-40" src={logo} alt="Logo" />
      </div>
      <div className="lg:hidden relative">
        <button onClick={toggleDropdown} className="text-3xl px-2 py-1 border border-gray-400 rounded">
          &#9776; {/* Hamburger icon */}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <ul className="flex flex-col p-2">
              <li className="px-4 py-2 hover:bg-gray-200">
                Online Status: {onlineStatus ? "✅" : "❌"}
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/body">Home</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/about">About</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/cart" className="flex items-center">
                  <img className="w-7 mr-1" src={shoppingcart} alt="Cart" />
                  <span>({cartItems.length})</span>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <button
                  className="w-full text-left"
                  type="button"
                  onClick={handleLogout}
                >
                  {btnNameReact}
                </button>
              </li>
              <li className="px-4 py-2 font-bold hover:bg-gray-200">
                Welcome, {loggedInUser}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center">
        <ul className="flex p-4 lg:m-0 items-center">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "❌"}</li>
          <li className="px-4 hover:font-bold">
            <Link to="/body">Home</Link>
          </li>
          <li className="px-4 hover:font-bold">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4 hover:font-bold">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 font-bold text-xl flex items-center">
            <Link to="/cart" className="flex items-center">
              <img className="w-7 mr-1" src={shoppingcart} alt="Cart" />
              <span>({cartItems.length})</span>
            </Link>
          </li>
          <li className="px-4">
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              type="button"
              onClick={handleLogout}
            >
              {btnNameReact}
            </button>
          </li>
          <li className="px-4 font-bold">Welcome, {loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
