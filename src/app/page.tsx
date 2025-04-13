"use client";

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

  // JSX -- What the user sees
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Video Note Taker</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url" // Use type="url" for better mobile keyboards & basic validation
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)} // Update state when user types
            placeholder="Enter YouTube video URL..."
            required // Make the field mandatory
            className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading} // Disable input while loading
          />
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Processing...' : 'Get Notes'}
          </button>
        </div>
      </form>

      {/* Status and Error Display Section */}
      <div className="w-full max-w-lg mb-4 text-center">
        {/* Show Status Message if not loading and no error, or if loading */}
        {statusMessage && (isLoading || !error) && (
          <p className={`text-sm ${isLoading ? 'text-gray-600 animate-pulse' : 'text-green-700'}`}>
            {statusMessage}
          </p>
        )}
        {/* Show Error Message if error exists */}
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md border border-red-300">
            Error: {error}
          </p>
        )}
      </div>

      {/* Results Section */}
      {notes && !isLoading && ( // Only show notes if they exist and not loading
        <div className="w-full max-w-lg mt-4 bg-white p-6 border border-gray-200 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Generated Notes:</h2>
          <textarea
            readOnly // Make it non-editable
            value={notes}
            className="w-full h-64 p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm" // Basic styling for notes display
            placeholder="Notes will appear here..."
          />
          {/* Add Copy/Download buttons here later */}
          <div className="mt-4 flex gap-2">
             <button
                onClick={() => navigator.clipboard.writeText(notes)}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
              >
                Copy Notes
              </button>
              {/* Download button placeholder */}
          </div>
        </div>
      )}

    </main>
  );
}
