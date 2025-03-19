import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import AnswerBox from '../Components/AnswerBox';
import axios from 'axios';

function Chatbot() {
  const RAG_API = "http://127.0.0.1:8080/?query=";

  const [question, setQuestion] = useState("");
  const [chatList, setChatlist] = useState([]); // List to store all chats
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const userQuestion = question;
    setQuestion(""); // Clear the input field

    // Immediately add the user's prompt to chatList so it appears in UI
    setChatlist((prev) => [
      ...prev,
      { prompt: userQuestion, response: "" }, // Empty response initially
    ]);

    setIsLoading(true); // Set loading state to true while waiting for AI response
    //http://127.0.0.1:8000/rag/ragchain/whoareyou
    const prompt = `http://gtdtt.digital/api/rag/ragchain/${encodeURIComponent(userQuestion)}`;

    try {
      const response = await axios.get(prompt); // Send the request to the API

      console.log("from chatbot" , response)
      // Update the chatList with the AI response
      setChatlist((prev) =>
        prev.map((chat) =>
          chat.prompt === userQuestion
            ? { ...chat, response: response.data.data } // Add response to the prompt
            : chat
        )
      );

      setIsLoading(false); // Reset loading state once the response is received
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Handle errors and reset loading state
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex">
        {/* Sidebar space */}
        <div className="sm:ml-64 flex-1 p-4 sm:p-8">
          <div className="flex flex-col gap-2 overflow-y-auto h-full">
            <AnswerBox message={"Hello, How can I help you?"} sender={false} />

            {/* Map through the chat list to display all prompts and responses */}
            {chatList.map((chat, index) => (
              <div key={index}>
                <AnswerBox message={chat.prompt} sender={true}  />
                <br></br>
                {/* Show loading spinner or empty until AI response is received */}
                {isLoading && chat.response === "" ? (
                  <AnswerBox message="..." sender={false} />
                ) : (
                  <AnswerBox message={chat.response} sender={false} />
                )}
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 w-[80%] p-4 bg-white dark:bg-gray-800">
            {/* Form to submit questions */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <textarea
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id="chat"
                className="w-full p-2.5 text-sm bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
              ></textarea>
              <button
                type="submit"
                className="ml-2 p-2 text-blue-600 rounded-full hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
