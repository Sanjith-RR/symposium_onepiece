"use client";

import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { useEffect, useLayoutEffect, useState } from "react";
import { FaDownload, FaPaperPlane } from "react-icons/fa";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(0); // 25 minutes in seconds
  const [secretCode, setSecretCode] = useState(""); // State for the secret code
  const router = useRouter(); // Initialize the router
  const [isAllowed, setIsAllowed] = useState(false);

    useLayoutEffect(() => {
        const accessGranted = localStorage.getItem("access_granted_3") === "true";
        
        if (!accessGranted) {
            router.push('/');  // Redirect if no access
        } else {
            setIsAllowed(true); // Grant access
        }
    }, []);

    useEffect(() => {
      // Check if there's a start time in localStorage
      const storedStartTime = localStorage.getItem('startTime_2');
      const storedDuration =  localStorage.getItem('duration_2') || (45 * 60).toString();
  
      if (storedStartTime) {
        const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
        const remainingTime = Math.max(parseInt(storedDuration.toString()) - elapsedTime, 0);
        setTimeLeft(remainingTime);
      } else {
        const newStartTime = Date.now(); // new Date('2024-03-16T10:00:00').getTime();
        localStorage.setItem('startTime_2', newStartTime.toString());
        localStorage.setItem('duration_2', storedDuration.toString());
        setTimeLeft(parseInt(storedDuration));
      }
    }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (secretCode==="TheOnePieceIsReal69!") {
      localStorage.setItem("access_granted_treasure", "true"); // Set access_granted to true
      router.push("/treasure"); // Redirect to /level_two
    }
  };

  const handleDataset = ()=>{
    window.open("https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook138.pdf", "_blank", "noopener,noreferrer");
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Header */}
      <div
        className="w-full flex justify-center items-center"
        style={{ backgroundColor: "#8A7D63", height: "20vh" }}
      >
        <h1 className="text-black text-8xl font-bold">Level Three</h1>
      </div>

      {/* Body with Background Image */}
      <div
        className="h-full w-full bg-cover bg-center flex flex-col justify-start items-start"
        style={{
          backgroundImage: "url('/images/treasure1.jpg')",
          paddingTop: "10vh",
          opacity: "0.8",
        }}
      >
        {/* Container with GIF and Countdown */}
        <div
          className="flex flex-row items-center"
          style={{
            width: "34.2vh",
            height: "12.1vh",
            backgroundColor: "#B29B6A",
            marginTop: "7vh",
            marginLeft: "10vh",
            padding: "0.5rem",
            overflow: "hidden", // Ensure nothing leaks outside
          }}
        >
          <iframe
            src="https://tenor.com/embed/14056873221910130729"
            className="border-0"
            style={{
              borderRadius: "10px",
              width: "50%",
              height: "100%",
            }}
            allowFullScreen
          ></iframe>
          <div className="ml-4 text-black text-xl font-semibold">
            <div className="flex flex-col">
              <span>Time Left:</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Secret Code Input */}
        <div
          className="flex flex-col items-start"
          style={{
            marginTop: "5vh",
            width: "50%",
            backgroundColor: "#B29B6A",
            padding: "1rem",
            borderRadius: "5px",
            marginLeft: "10vh",
          }}
        >
          <div className="text-black text-xl font-semibold mb-2">
            Enter The Secret Code:
          </div>
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="eg: 13482938"
              className="p-2 text-black text-left"
              style={{
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #B29B6A",
              }}
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              onKeyPress={handleKeyPress} // Add onKeyPress event
            />
            <button
              className="ml-2 p-2 text-white bg-blue-500 rounded"
              style={{ borderRadius: "5px" }}
              onClick={handleSubmit} // Add onClick event
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Download Button Container */}
        <div
          className="flex items-center hover:shadow-lg hover:shadow-yellow-500 transition-shadow duration-300"
          style={{
            marginTop: "15vh",
            width: "15%",
            backgroundColor: "#B29B6A",
            padding: "1rem",
            borderRadius: "5px",
            marginLeft: "10vh",
          }}
        >
          <FaDownload className="text-black mr-2 hover:text-yellow-500 transition-colors duration-300" />
          <button className="text-black text-xl font-semibold hover:text-yellow-500 transition-colors duration-300" onClick={handleDataset}>
            Download Dataset
          </button>
        </div>
      </div>
    </div>
  );
}
