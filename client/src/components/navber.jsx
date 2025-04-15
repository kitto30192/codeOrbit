import React, { useState,useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import  {jwtDecode} from 'jwt-decode';


const Navbar = () => {
  const [showCard, setShowCard] = useState(false);
  const [securityKey, setSecurityKey] = useState("");
  const navigate = useNavigate();
  const [decode,setDecode]= useState(null);


  useEffect(() => {
    const tokenFromCookies = Cookies.get("UID"); // Retrieve the cookie
    if (tokenFromCookies) {
      try {
        const decoded = jwtDecode(tokenFromCookies); // Decode the token
        setDecode(decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    }
  }, []); // Dependency array ensures this runs once on mount

  const handleJoinRoom = () => {
    if (!decode) {
      navigate("/login"); // Redirect if decode is null
      return null;
    }

    if (securityKey.trim()) {
      console.log(`Joining room with key: ${securityKey}`);
      const questionId = parseInt(securityKey.slice(-4), 10);

      const username = decode?.name || "Guest"; // Use decode.name directly

      setShowCard(false);
      return `/codeEditor?name=${username}&room=${securityKey}&questionId=${questionId}`;
    } else {
      alert("Please enter a valid security key!");
      return null;
    }
  };
      
      
  
  

  return (
    <nav className="flex items-center justify-between px-8 py-4  bg-gray-900 ">
      {/* Logo */}
      <div className="text-3xl  text-white  text-shadow-xl  text-shadow-yellow-500 font-bold italic">
        CodeOrbit
      </div>

      {/* Search Bar */}
      <div className="flex items-center border rounded-full px-4 py-2 shadow-sm border-pink-300">
        <input
          type="text"
          placeholder="Search Questions?"
          className="bg-gray-900 outline-none flex-grow text-gray-600"

        />
        <select className="bg-transparent text-gray-600 mx-2">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <button className="text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 1 0 5.29 14.71l4 4a1 1 0 0 0 1.42-1.42l-4-4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1-4.24 10.24 6 6 0 0 1 4.24-10.24z" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-white">
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Explore
        </NavLink>

        <NavLink
          to="/problems"
          className={({ isActive }) =>
            isActive ? "underline font-bold" : "hover:underline"
          }
        >
          Problems
        </NavLink>
        <Link to="/Dashboard" className="font-medium hover:underline">
          Dashboard
        </Link>
      </div>

      {/* Join Code Room Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        onClick={() => setShowCard(true)}
      >
        Join Code Room
      </button>

      {/* Card for Security Key */}
      {showCard && (
        <div className="absolute top-20 right-10 bg-gray-900 shadow-lg rounded-lg p-4 border border-gray-300 w-72">
          <h3 className="text-lg text-white font-semibold mb-4">Enter Security Key</h3>
          <input
  type="text"
  placeholder="Security Key"
  className="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
  value={securityKey}
  onChange={(e) => setSecurityKey(e.target.value)} // Updates state without triggering a page refresh
/>
<div className="flex justify-between">
  <button
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    onClick={() => {
      if (securityKey.trim()) {
        const path = handleJoinRoom(); // Generate the path dynamically
        navigate(path); // Use `navigate` from `react-router-dom` to go to the path
      } else {
        alert("Please enter a valid security key!");
      }
    }}
  >
    Join
  </button>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowCard(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

