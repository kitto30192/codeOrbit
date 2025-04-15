import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/user";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getDynamicSvgPath = useMemo(() => {
    const basePath = "/src/loginSection/sign-up-animate.svg";
    const timestamp = new Date().getTime();
    return `${basePath}?t=${timestamp}`;
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form reload
    setError(""); // Clear any previous errors

    if (!email || !password || !username || !name || !number || !country) {
      setError("All fields are required.");
      return;
    }

    try {

      const response = registerUser(JSON.stringify({email, password, number, name, username, country}));
      if (response.status === 200) {
        const data = await response.json();
        alert("Signup successful!");
        navigate('/Login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed.");
      }

      // const response = await fetch("http://localhost:3000/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password, number, name, username, country }),
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   alert("Signup successful!");
      //   navigate('/Login');
      //   // Additional actions like redirection can be added here
      // } else {
      //   const errorData = await response.json();
      //   setError(errorData.message || "Signup failed.");
      // }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className=" bg-gradient-to-r from-slate-700 to-slate-300 flex items-center justify-center shadow-xl shadow-black">
      <div className="w-1/2 bg-slate-300 shadow-lg rounded-lg p-8 flex flex-col sm:flex-row sm:space-x-8">
        {/* Left Section: Form */}
        <div className="w-full sm:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="number"
                placeholder="Enter number"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block mt-5 text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                placeholder="Country Name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label className="block mt-5 text-sm font-medium text-gray-700">Create Password</label>
              <input
                type="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to all statements in{" "}
                <a href="#" className="text-blue-500 underline">
                  Terms of Service
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onSubmit={handleSignUp}
            >
              Register
            </button>
          </form>
        </div>
        {/* Right Section: Illustration */}
        <div className="hidden sm:block w-full sm:w-1/2">
          <img
            src={getDynamicSvgPath} // Load SVG dynamically
            alt="Coding Animation"
            className="hover:transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
