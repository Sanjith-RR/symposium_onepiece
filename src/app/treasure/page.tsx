"use client"
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function FullScreenBackground() {
  const router=useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  
      useLayoutEffect(() => {
          const accessGranted = localStorage.getItem("access_granted_treasure") === "true";
          
          if (!accessGranted) {
              router.push('/');  // Redirect if no access
          } else {
              setIsAllowed(true); // Grant access
          }
      }, []);

  return (
    <div
      className="h-screen w-screen bg-center"
      style={{
        backgroundImage: "url('/images/treasure.png')",
        // backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content can go here */}
    </div>
  );
}

