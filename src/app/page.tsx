import Image from "next/image";
import React, { useState } from "react";

export default function Home() {

  //State Variables
  const [youtubeUrl, setYoutubeUrl] = useState(''); // For the input field
  const [notes, setNotes] = useState(''); // To store the final notes
  const [isLoading, setIsLoading] = useState(false); // To track if processing is happening
  const [statusMessage, setStatusMessage] = useState(''); // To show messages like "Processing..."
  const [error, setError] = useState<string | null>(null); // To store any error messages

  //Event Handlers
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted! URL: ", youtubeUrl);
    setIsLoading(true);
    setError(null);
    setNotes('');
    setStatusMessage('Sending Request...'); // Initial Status

    // -----------!!! ADD FETCH CALL TO BACKEND API HERE !!! ---------------

    // Simulate some delay for testing UI (remove later)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/failure (remove later)
    if(youtubeUrl.includes("fail")){
      setError("Simulated error occurred!");
      setStatusMessage("Failed to process")
    }else{
      setNotes("Simulated Notes for: " + youtubeUrl);
      setStatusMessage("Simulated processing complete");
    }

    setIsLoading(false);
  }

  return (
  );
}
