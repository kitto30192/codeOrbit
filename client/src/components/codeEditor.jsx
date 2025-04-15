import React, { useState, useEffect,createContext } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode } from './api';
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import queryString from 'query-string';
import axios from "axios";
import { getQuestionById } from '../api/question';
const ENDPOINT =  'http://localhost:8000';
let socket ;
export const SocketContext = createContext(); // Replace with your server's URL

function CodeEditor( ) {
  
  const location = useLocation();

  const [room, setRoom] = useState('');
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  
  const [question,setQuestion] = useState('');
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("// write your code here");
  const [output, setOutput] = useState("");
  const [showRoomKeyCard, setShowRoomKeyCard] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  useEffect(() => {
    const { questionId, name, room } = queryString.parse(location.search); // Parsing the query parameters
    socket = io(ENDPOINT);
    console.log(room, name, questionId); // Log these values for debugging
     setRoom(room);
    // Initialize socket connection
    // Ensure socket is initialized here

    // Fetch question data based on questionId
    const respone = getQuestionById(questionId);
    respone
      .then((data) => {
        console.log(data); // Log the fetched question data
        setQuestion(data); // Set the question data in state
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
      });
      

    socket.emit("joinRoom", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on("message", (data) => {
      const { sender, message } = data;
    
      setMessages((prevMessages) => [
        ...prevMessages,
        `${sender}: ${message}`,
      ]);
    });
    

    socket.on("roomData", (user) => {
      setMessages((prevMessages) => [...prevMessages, `${user.name} has joined the room`]);
    });

    socket.on("codeUpdate", (newCode) => {
      setValue(newCode); // Update the editor with the new code
    });

    // Room data update
   
    return () => {
      socket.disconnect(); // Cleanup
    };
  }, []);

   // Handle input change
   const handleInputChange = (e) => setMessage(e.target.value);

   // Handle sending messages
   const handleSendMessage = () => {
    if (message.trim()) {
      const data = {
        room: room,
        message: message,
      };
  
      socket.emit("message", data);
  
      setMessages((prevMessages) => [
        ...prevMessages,
        `You: ${message}`,
      ]);
      setMessage("");
    }
  };
  



  

  // Emit code changes
  const handleEditorChange = (newValue) => {
    setValue(newValue);
    console.log(newValue) // Update local state
    socket.emit("codeUpdate", { room, code: newValue }); // Emit change to server
  };
  const runCode = async () => {
    if (!value) return;
    try {
      const stdin = "2\n7\n11\n15\n9";
      const response = await executeCode(language, value, stdin);
      console.log(response);
      setOutput(response.run.output);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const results = [];
      const storedResult = [];
      console.log(question[0].input_output);
      for (const input of question[0].input_output) {
        console.log(input);
        storedResult.push(input.Output);
        const response = await executeCode(language, value, input.input);
        results.push(response.run.output);
      }
      console.log(results);
      console.log(storedResult);
      if (results[0] === storedResult[0]) console.log("yes");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSolveWithTeam = () => {
    setShowRoomKeyCard(true); // Show the card
  };


  const handleAiHelp = async () => {
    setError("");
    setResponse("");
  
    // Construct the prompt dynamically
    const promo =  `${value} help me with this code in short,for question  ${question[0].description} `;
    console.log(promo);
  
    try {
      // Send POST request to Flask API
      const result = await axios.post(
        "http://127.0.0.1:5000/generate",
        { prompt: promo }, // Use promo directly
        {
          headers: {
            "Content-Type": "application/json", // Set content type
          },
        }
      );
  
      // Set response data
      console.log(result); // Assuming `response` is the key in result.data
      setMessages((prevMessages) => [
        ...prevMessages,
        `Jinni: ${result.data}`,
      ]);
    } catch (err) {
      console.log("Error occurred:", err);
  
      // Handle errors gracefully
      const errorMessage =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : "Something went wrong";
      setError(errorMessage);
      console.log("Error Message:", errorMessage);
    }
  };
  
  

 

  return (
    <>
      <div className="flex bg-gray-900">
        <div className=" px-2  w-2/3 mb-11  h-[150vh] rounded-xl shadow-xl shadow-black border-0.5 border-stone-800">
          {question ? (
            <div className="bg-gray-600 h-[140vh] p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-8">
               <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-black">
                {question[0].id} : {question[0].title}
              </h1>
              <button
                className="p-1 w-50 flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-800"
                onClick={() => handleAiHelp()}
              >
                <img
                 src="src/components/jinn.png" // Path to Jini's photo
                  alt="Jini"
                  className="w-6 h-6 rounded-full"
                />
                Ask Jinni
              </button>
              </div>
              <p className="text-xl text-black font-semibold  mb-6">
                {question[0].description}
              </p>
              <label className=' text-xl font-bold text-black'> input instruction :</label>
              <p className=" text-black font-semibold text-base mb-6">
                {question[0].input_instruction}
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Input/Output examples */}
                {question[0].input_output.slice(0, 2).map((io, index) => (
                <div key={index} className="bg-gray-500 shadow-xl shadow-black  border rounded-lg p-4 flex-1 min-w-[250px]">
                  <p className="text-sm font-semibold text-black mb-2">
                    Example {index + 1} - INPUT:
                  </p>
                  <p className="text-white bg-gray-600 p-2 rounded-md border">
                    {io.Input}
                  </p>
                  <p className="text-sm font-semibold text-black mt-4 mb-2">
                    Example {index + 1} - OUTPUT:
                  </p>
                  <p className="text-white bg-gray-600 p-2 rounded-md border">
                    {io.Output}
                  </p>
                </div>
                ))}
              </div>
              <div className="mt-10  bg-gray-600 flex items-center justify-center">
                          <div className="w-full mx-auto mt-8">
                  <div className="bg-gray-600 border border-gray-300 rounded-lg   shadow-lg">
                    <div className="p-4 h-56 overflow-y-auto">
                      {messages.map((msg, index) => (
                        <div key={index} className="mb-2 p-2 min-w-fit text-green-400 bg-gray-700 rounded-lg">
                          {msg}
                        </div>
                      ))}
                    </div>
                    <div className="p-4 flex items-center space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          ) : (
            <p>No question data available</p>
          )}

         {/* Hint Modal/Card */}
        {showHint && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Hint</h2>
              <p className="text-lg mb-4">
                Think about breaking down the problem into smaller parts and using loops or functions to solve it efficiently.
              </p>
              <button
                className="w-24 rounded-lg bg-red-500 text-white hover:bg-red-700"
                onClick={() => setShowHint(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
        <div className="m-4 h-3/4 w-1/2 rounded-xl border-4 border-stone-800">
          <div className="flex justify-center bg-zinc-950 p-2 h-12">
            <button
              className="w-16 mr-4 rounded-lg bg-red-500 text-white hover:bg-green-800 active:text-2xl"
              onClick={runCode}
            >
              Run
            </button>
            <button
              className="w-20 rounded-lg bg-blue-700 text-white hover:bg-blue-900 active:text-2xl"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="w-36 ml-4 rounded-lg bg-purple-700 text-white hover:bg-purple-900 active:text-2xl"
              onClick={handleSolveWithTeam}
            >
              Invite your Team
            </button>
            <h4 className="ml-24 italic text-white">Selected Language:</h4>
            <select
              className="ml-6 bg-zinc-800 text-white rounded px-2 pb-1"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="csharp">Csharp</option>
            </select>
          </div>
          <Editor
            height="100vh"
            language={language}
            value={value}
            onChange={handleEditorChange}
            theme='vs-dark'
          />
          <div className="p-4 h-60 bg-zinc-950 text-white" style={{ whiteSpace: "pre-line" }}>
            output : {output}
          </div>
        </div>
      </div>

      {/* Room Key Card */}
      {showRoomKeyCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Room Key</h2>
            <p className="text-lg mb-4">{room}</p>
            <button
              className="w-24 rounded-lg bg-red-500 text-white hover:bg-red-700"
              onClick={() => setShowRoomKeyCard(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CodeEditor;



