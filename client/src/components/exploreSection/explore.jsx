import React, { useEffect } from "react";
import AnimatedText from "./textAnimation";
import Typewriter from "typewriter-effect";
import typewriterSound from '/src/exploreSection/typeing.mp3';
import { useNavigate } from "react-router-dom";
function Explore() {



    useEffect(() => {
        // Set audio volume
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            audioElement.volume = 0.2; // Set volume to 20%
        }
    }, []);
    
    function PlaySound(duration = 5000, speed = 0.90) {
      const audio = new Audio(typewriterSound);
    
      // Set playback speed (default is 1.0, higher values are faster, lower values are slower)
      audio.playbackRate = speed;
    
      audio.play();
    
     
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; 
      }, duration);
    }
    
    const navigate = useNavigate();
    // Generate a unique URL for the SVG file
    const getDynamicSvgPath = () => {
        const svgPath = "/src/exploreSection/coding-animate.svg";
        const timestamp = new Date().getTime(); // Current timestamp
        return `${svgPath}?t=${timestamp}`; // Append timestamp as a query parameter
    };

    return (
        // <div className="h-screen bg-gradient-to-r from-slate-700 to-slate-300 min-h-screen flex  justify-center">
        //     {/* Audio element */}
        //     <audio autoPlay loop>
        //         <source 
        //             src="/src/exploreSection/Main Title 3 Body Problem Official Soundtrack Netflix.mp3" 
        //             type="audio/mpeg" 
        //         />
        //         Your browser does not support the audio element.
        //     </audio>

        //     {/* Image with dynamic SVG loading */}
        //     <div className="w-2/3 h-1/3 mt-0.5 flex flex-col items-center justify-center border border-gray-200">
        //     </div>
        //     <div className="flex justify-end w-1/3  px-4">
        //         <img
        //             src={getDynamicSvgPath()} // Load SVG dynamically
        //             alt="Coding Animation"
        //             className="  hover: transition-transform duration-300" 
        //         />
        //     </div>
        // </div>
    <div className="font-sans">

      {/* Hero Section */}
      <section
  className="bg-cover bg-center h-[150vh] text-white flex items-center justify-center"
  style={{ backgroundImage: "url('src/exploreSection/3body.jpg')" }}
>
  <div className="text-center relative mt-12 z-10">
    <p className="text-2xl font-oxanium md:text-6xl text-gray-300">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .callFunction(() => PlaySound())
            .typeString("Code your way to the future.")
            .pauseFor(150)
            .start();
        }}
      />
    </p>
    <p className="mt-4 font-oxanium text-lg">
      Be careful with what you know. That's where most people's troubles begin.
    </p>
    <div className="mt-6 flex space-x-4 justify-center">
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={()=>{navigate('/problems')}}
      >
        Go To Problems
      </button>
    </div>
    <p className="mt-4 font-oxanium  text-lg underline">
      Know about 3 Body Problem 
    </p>

    <div className="container mx-auto mt-40 text-center ">
      <h2 className="text-3xl font-bold mb-8">What we do</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="w-full max-w-md mx-auto bg-transparent  text-white border  border-blue-100 rounded-lg shadow-lg p-6">
          {/* Header Text */}
          <h2 className="text-xl font-oxanium   font-bold">
             CodeOrbit's DSA  Crash Course:
          </h2>
          {/* Subtitle */}
          <p className="mt-2 font-oxanium text-lg">
          high-quality coding questions often asked in interviews at big tech companies
          </p>
          {/* Button */}
          <div className="mt-6">
            <button className="bg-white text-green-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-200">
              Start Learning
            </button>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto bg-transparent  text-white border border-yellow-100 rounded-lg shadow-lg p-6">
          {/* Header Text */}
          <h2 className="text-xl font-oxanium   font-bold">
             CodeOrbit's Interview Crash Course:
          </h2>
          {/* Subtitle */}
          <p className="mt-2 font-oxanium text-lg">
          the focus often shifts to your understanding of concepts, problem-solving approach, and practical application of skills
          </p>
          {/* Button */}
          <div className="mt-6">
            <button className="bg-white text-green-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-200">
              Start Learning
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto bg-transparent  text-white border  border-red-200 rounded-lg shadow-lg p-6">
          {/* Header Text */}
          <h2 className="text-xl font-oxanium   font-bold">
            CodeOrbit's Web Devlopement Crash Course:
          </h2>
          {/* Subtitle */}
          <p className="mt-2 font-oxanium text-lg">
          technical questions for web development that are commonly asked in personal interviews, focusing on concepts, problem-solving, and hands-on coding
          </p>
          {/* Button */}
          <div className="mt-6">
            <button className="bg-white text-green-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-200">
              Start Learning
            </button>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</section>





      {/* About Company Section */}
      <section id="about" className="py-16 bg-[#091e2a]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-white font-oxanium font-bold mb-4"
          >About developer</h2>
          <p className="text-white font-oxanium mb-8">Fueled by coffee, powered by code, and driven by curiosity.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">▶ Linkdein Profile</button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">We Have Done Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">Image 1</div>
            <div className="bg-white p-6 rounded-lg shadow-md">Image 2</div>
            <div className="bg-white p-6 rounded-lg shadow-md">Image 3</div>
            <div className="bg-white p-6 rounded-lg shadow-md">Image 4</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#091e2a] text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold">1000+</h3>
            <p>Projects Done</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">900+</h3>
            <p>Happy Clients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p>Awards</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <form className="max-w-lg mx-auto space-y-4">
            <input type="text" placeholder="Name" className="w-full p-3 border rounded" required />
            <input type="email" placeholder="Email" className="w-full p-3 border rounded" required />
            <textarea placeholder="Message" className="w-full p-3 border rounded" required></textarea>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Send Now</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 All Rights Reserved. Free HTML Template.</p>
        </div>
      </footer>
    </div>
    );
}

export default Explore;

