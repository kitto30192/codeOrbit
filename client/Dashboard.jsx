import React from "react";
import { useState,useEffect } from "react";
import  {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.css'
import { useNavigate } from "react-router-dom";
import Login from "./src/loginSection/login";
function Dashboard() {
  const token = Cookies.get('UID'); 
  const [decode,setDecode]= useState(null)// Retrieve the cookie
  const totalProblems = 805;
  const attempting = 20;
  const navigate = useNavigate();

  const levels = [
    { name: "Contributor", points: "1 Point", color: "bg-purple-200", icon: "⭐" },
    { name: "Proficient", points: "100 Points", color: "bg-pink-200", icon: "🎖️" },
    { name: "Scholar", points: "1k Points", color: "bg-orange-200", icon: "🎓" },
    { name: "Master", points: "10k Points", color: "bg-purple-300", icon: "👑" },
    { name: "Ace", points: "50k Points", color: "bg-yellow-200", icon: "💎" },
  ];


  useEffect(() => {
    const tokenFromCookies = Cookies.get('UID'); // Retrieve the cookie
    if (tokenFromCookies) {
      try {
        const decoded = jwtDecode(tokenFromCookies); // Decode the token
        setDecode(decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    }
  }, []);

  if (!decode) {
    return <Login/>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Settings</button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {/* Profile Card */}
        <div className="bg-gray-600 rounded-lg shadow-lg p-4 flex items-center col-span-1">
          <div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden mr-4">
            {/* Replace src with the user's profile picture */}
            <img
              src="/src/loginSection/prof.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div >
            <h2 className="text-lg text-white font-bold">{decode.name}</h2>
            <p className="text-sm text-gray-100">username : {decode.username}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-gray-600 rounded-lg shadow-lg p-4">
          <h3 className="text-sm text-white font-semibold">Total Problem Solved </h3>
          <p className="text-2xl font-bold">{decode.problemsolved}</p>
        </div>
        <div className="bg-gray-600 rounded-lg shadow-lg p-4">
          <h3 className="text-sm text-white font-semibold"> problem solved today</h3>
          <p className="text-2xl font-bold">10</p>
        </div>
        <div className="bg-gray-600 rounded-lg shadow-white p-4">
          <h3 className="text-sm text-white font-semibold">Current Streak </h3>
          <p className="text-2xl font-bold">10</p>
        </div>

        {/* Graph Section */}
        <div className="bg-gray-600 rounded-lg shadow-lg p-4 col-span-2">
                <div className="bg-gray-600 rounded-lg shadow-lg p-4 col-span-2">
        <h3 className="text-lg text-white font-bold mb-4">Last Problems Solved</h3>
        <ul className="space-y-4">
          <li className="text-white flex justify-between items-center">
            <span className="font-semibold">1. Two Sum</span>
            <span className="text-gray-300 text-sm">2024-12-31 | 12:30 PM</span>
          </li>
          <li className="text-white flex justify-between items-center">
            <span className="font-semibold">2. Reverse a Linked List</span>
            <span className="text-gray-300 text-sm">2024-12-31 | 1:45 PM</span>
          </li>
          <li className="text-white flex justify-between items-center">
            <span className="font-semibold">3. Longest Substring Without Repeating Characters</span>
            <span className="text-gray-300 text-sm">2024-12-30 | 5:20 PM</span>
          </li>
          <li className="text-white flex justify-between items-center">
            <span className="font-semibold">4. Merge Two Sorted Lists</span>
            <span className="text-gray-300 text-sm">2024-12-29 | 3:15 PM</span>
          </li>
          <li className="text-white flex justify-between items-center">
            <span className="font-semibold">5. Valid Parentheses</span>
            <span className="text-gray-300 text-sm">2024-12-28 | 10:10 AM</span>
          </li>
        </ul>
      </div> 
        </div>
        <div className="bg-gray-600 rounded-lg shadow-lg p-4 col-span-2">
          <h3 className="text-lg text-white font-bold">Progress Chart</h3>
          <div className=" rounded-lg p-6 flex items-center justify-between">
      {/* Circular Progress */}
      <div className="w-40 h-40 p-4 mb-10">
        <CircularProgressbar
          value={(decode.problemsolved / totalProblems) * 100}
          text={`${decode.problemsolved}/${totalProblems}`}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: '#4caf50',
            trailColor: '#444',
            textSize: '16px',
          })}
        />
        <div className="text-center mt-2">
          <p className="text-green-500 font-semibold">✔ Solved</p>
          <p className="text-gray-300">{attempting} Attempting</p>
        </div>
      </div>

      {/* Problem Breakdown */}
      <div className="flex flex-col space-y-2">
        <div className="bg-gray-800 px-4 py-2 rounded-md text-right">
          <p className="text-teal-400 font-semibold">Easy</p>
          <p className="text-white text-sm">36/325</p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-md text-right">
          <p className="text-yellow-400 font-semibold">Med.</p>
          <p className="text-white text-sm">52/403</p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-md text-right">
          <p className="text-red-500 font-semibold">Hard</p>
          <p className="text-white text-sm">12/77</p>
        </div>
      </div>
    </div>
        </div>

        {/* Statistics Section */}
        <div className="flex justify-center items-center  bg-gray-900">
      <div className="p-6 bg-gray-600 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Info</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm text-gray-500">College Name</h3>
            <p className="text-lg font-medium text-gray-800">XYZ College</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Country</h3>
            <p className="text-lg font-medium text-gray-800">United States</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">University</h3>
            <p className="text-lg font-medium text-gray-800">ABC University</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center  bg-gray-900">
      <div className="p-6 bg-gray-600 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Info</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm text-gray-500">College Name</h3>
            <p className="text-lg font-medium text-gray-800">XYZ College</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Country</h3>
            <p className="text-lg font-medium text-gray-800">United States</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">University</h3>
            <p className="text-lg font-medium text-gray-800">ABC University</p>
          </div>
        </div>
      </div>
    </div>
        
        <div className=" bg-gray-600 rounded-lg shadow-lg p-4 col-span-2">
        <div className="flex flex-col items-center space-y-8 p-6">
      <div className="flex justify-between bg-gray-600 text-white w-full max-w-4xl">
        {levels.map((level, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full ${level.color} text-3xl`}
            >
              {level.icon}
            </div>
            <p className="text-center text-lg font-semibold">{level.name}</p>
          </div>
        ))}
      </div>
      <div className="relative w-full max-w-4xl">
        <div className="absolute top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2"></div>
        <div className="flex justify-between w-full">
          {levels.map((level, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 transform translate-y-4"
            >
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <p className="text-sm font-medium">{level.points}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 

