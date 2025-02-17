import React, { useState } from "react";
import  cookieParser from'cookie-parser'; 
import { useNavigate } from "react-router-dom";
function Login() {
    // State for email, password, and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        setError(""); // Clear any previous errors
        
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                //alert(`Login successful! Token: ${data.token}`);
                // Perform additional actions, e.g., store token, redirect, etc.
                navigate('/Explore');
                
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <div className="h-screen max-w-screen flex justify-center items-center bg-cover"
            style={{ backgroundImage: "url('src/loginSection/3sun1.jpg')" }}>
                <form
                    onSubmit={handleLogin}
                    className="w-1/4 shadow-xl shadow-black p-4 space-y-4 rounded-md bg-gray-900"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="w-full p-2 text-white border bg-gray-700 border-gray-900 rounded-md"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-2 border bg-gray-700 border-gray-300 rounded-md"
                    />
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <div className="flex justify-between items-center">
                    <button
                        onClick={()=>navigate('/SignUp')}
                        className="w-full bg-green-500 mr-2 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        SignUp
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;

