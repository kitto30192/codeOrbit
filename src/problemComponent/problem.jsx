import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Problem(props) {
    const [ico ,setIco] = useState(faPlay);
    const [levelColor ,setLevelColor] =useState("text-black");
    const [statusColor ,setStatusColor] = useState("text-black");
    const navigate = useNavigate(); 


    useEffect( ()=>{
            if (props.status=="solved") {
                setIco(faCheck);
                setStatusColor("text-green-400");
            }

            if (props.level === "Easy") {
                setLevelColor("text-green-400"); // green for Easy
            } else if (props.level === "medium") {
                setLevelColor("text-yellow-300"); // yellow for Medium
            } else if(props.level === "Hard"){
                setLevelColor("text-red-500"); // red for other levels
            }        
    },[]);


    const handleIconClick = async () => {
      try {
          // Perform the GET request to fetch question details
          const response = await fetch( `http://localhost:3000/question/${props.id}`);

          if (response.ok) {
              const questionData = await response.json();
              // Navigate to the code editor page with question data as state
              navigate("/CodeEditor", { state: { question: questionData } });
          } else {
              console.error("Failed to fetch question data");
          }
      } catch (error) {
          console.error("Error fetching question data:", error);
      }
  };

  return (
    <div className="grid grid-cols-10 gap-6 bg-slate-500 border border-black p-4 rounded-lg ">
      <FontAwesomeIcon icon={ico} className="ml-4 flex justify-center"  onClick={handleIconClick} />
      <div className="text-center font-extrabold">{props.id}</div>
      <div className="col-span-4 text-center font-semibold">{props.title}</div>
      <div className={`col-span-2 text-center font-bold ${levelColor} font-medium`}>{props.level}</div>
      <div className={`col-span-2 text-center font-bold ${statusColor} font-medium`}>{props.status}</div>
    </div>
  );
}

export default Problem;
