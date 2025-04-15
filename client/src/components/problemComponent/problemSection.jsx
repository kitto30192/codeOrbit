import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import  {jwtDecode} from 'jwt-decode';
import { getAllQuestions } from "../../api/question";

function ProblemSection() {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [decode,setDecode]= useState(null);
  const [dailyChallenge, setDailyChallenge] = useState({
    id: 101,
    title: "Trapping Rainwater",
    description: "Given an array of heights, calculate how much water can be trapped between the bars.",
    toughLevel: "Easy",
    probStatus: "unsolved", // hardcoded status
    topic: "Basic Math",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllQuestions(); // Fetch questions from the API
        setQuestions(response.data);

        // Extract unique topics from the questions
        const uniqueTopics = [...new Set(response.data.map((q) => q.topic))];
        setTopics(uniqueTopics);
      } catch (error) {
        console.error("Error fetching questions or daily challenge:", error);
      }
    };

    fetchQuestions();
  }, []);


   useEffect(() => {
      const tokenFromCookies = Cookies.get('UID');// Retrieve the cookie
      if (tokenFromCookies) {
        try {
          const decoded = jwtDecode(tokenFromCookies); // Decode the token
          setDecode(decoded);
        } catch (error) {
          console.error("Invalid token:", error.message);
        }
      }
    }, []);

  // const handleIconClick = async (id) => {
  //   try {
  //     // const response = await fetch(`http://localhost:3000/question/${id}`);
  //     // if (response.ok) {
  //     //   const questionData = await response.json();
  //     //   navigate("/CodeEditor", { state: { question: questionData } });
  //     // } else {
  //     //   console.error("Failed to fetch question data");
  //     // }

  //     const userName = Cookies.get("uid"); // Retrieve the user name from cookies
  //     const questionId = id; // Replace with the actual dynamic question ID
  //     if (!userName) {
  //       e.preventDefault();
  //       alert("User not logged in. Please log in first.");
  //       return;
  //     }
  //     const roomId = generateRoomId(questionId); // Generate the room ID
  //     const url = `/chat?name=${userName}&room=${roomId}&questionId=${questionId}`;
  //     e.preventDefault(); // Prevent default behavior
  //     window.location.href = url; // Navigate manually
  //   }
  //   catch (error) {
  //     console.error("Error fetching question data:", error);
  //   }
  // };

  const generateRoomId = (questionId) => {
    const randomPart = Math.random().toString(36).substring(2, 8); // Generate a 6-character random string
    const questionSuffix = questionId.toString().padStart(4, "0").slice(-4); // Ensure the question ID is 4 digits
    return `${randomPart}${questionSuffix}`; // Append question ID to the random part
  };
  
  const handleIconClick = (id) => {
    if(decode) {
    const userName = decode.username; // Retrieve the user name from cookies
    const questionId = id; // Use the provided question ID
    
    if (!userName) {
      alert("User not logged in. Please log in first.");
      return null; // Return null to prevent navigation
    }
  
    const roomId = generateRoomId(questionId); // Generate the room ID
    return `/codeEditor?name=${userName}&room=${roomId}&questionId=${questionId}`;
  }
  else {
    navigate("/login");
  }
 

  };

  const determineIconAndColors = (status, level) => {
    let icon = faPlay;
    let levelColor = "text-black";
    let statusColor = "text-black";

    if (status === "solved") {
      icon = faCheck;
      statusColor = "text-green-400";
    }

    if (level === "Easy") {
      levelColor = "text-green-400"; // green for Easy
    } else if (level === "medium") {
      levelColor = "text-yellow-300"; // yellow for Medium
    } else if (level === "Hard") {
      levelColor = "text-red-500"; // red for Hard
    }

    return { icon, levelColor, statusColor };
  };

  const filteredQuestions = questions.filter(
    (question) => selectedTopic === "all" || question.topic === selectedTopic
  );

  return (
    <div className="w-full h-1/2 mt-1 bg-gray-800 text-white p-6 rounded-lg flex flex-wrap">
      <div className="w-full lg:w-1/4 p-4">
        {/* Daily Coding Challenge Section */}
        <div className="bg-gray-700 mt-8 ml-4 h-1/2 p-4 border rounded-lg shadow-xl shadow-black">
          <h3 className=" h-1/5 font-semibold  text-xl  mb-2 flex justify-center">Daily Coding Challenge</h3>
          {dailyChallenge && (
            <div className="text-center">
              <p className="text-lg h-1/5 my-1 font-bold">{dailyChallenge.id}: {dailyChallenge.title}</p>
              <p className="text-sm h-2/5 text-gray-400">{dailyChallenge.description}</p>
              <button
                className="mt-6 h-1/5 px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => navigate("/CodeEditor", { state: { question: dailyChallenge } })}
              >
                Solve Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Available Problems</h2>

        {filteredQuestions.length === 0 ? (
          <p className="text-center">No questions found for this topic.</p>
        ) : (
          filteredQuestions.map((question) => {
            const { icon, levelColor, statusColor } = determineIconAndColors(
              question.probStatus,
              question.toughLevel
            );
            return (
              <div
                key={question.id}
                className="grid grid-cols-10 gap-6 bg-gray-700 border border-xl p-4 rounded-lg mb-4 shadow-xl shadow-black"
              >
                <Link
                to={handleIconClick(question.id) || "#"} // Use "#" as a fallback if the user is not logged in
                onClick={(e) => {
                  if (!handleIconClick(question.id)) {
                    e.preventDefault(); // Prevent navigation if user is not logged in
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="ml-4 flex justify-center cursor-pointer"
                />
                </Link>

                <div className="text-center font-extrabold">{question.id}</div>
                <div className="col-span-4  text-black text-center font-bold">
                  {question.title}
                </div>
                <div className={`col-span-2 text-center font-bold ${levelColor} font-medium`}>
                  {question.toughLevel}
                </div>
                <div className={`col-span-2 text-center font-bold ${statusColor} font-medium`}>
                  {question.probStatus}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProblemSection;






