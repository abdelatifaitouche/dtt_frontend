import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import AnswerBox from '../Components/AnswerBox';
import axios from 'axios';

function Chatbot() {
  const RAG_API = "https://rag-api-la3x.onrender.com/?query=";

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

    // Prepare the API URL with the user's question
    const prompt = `${RAG_API}${encodeURIComponent(userQuestion)}`;
    console.log(prompt);

    try {
      const response = await axios.get(prompt); // Send the request to the API
      console.log(response.data); // Log the AI response

      // Update the chatList with the AI response
      setChatlist((prev) =>
        prev.map((chat) =>
          chat.prompt === userQuestion
            ? { ...chat, response: response.data } // Add response to the prompt
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
    <div>
      <NavBar />
      <div className="p-4 sm:ml-64 flex flex-col justify-between h-[100vh]">
        <div className="flex flex-col gap-2 h-[100vh] overflow-y-scroll">
          <AnswerBox message={"Hello, How can I help you?"} sender={false} />
          
          {/* Map through the chat list to display all prompts and responses */}
          {chatList.map((chat, index) => (
            <div key={index}>
              <AnswerBox message={chat.prompt} sender={true} />
              {/* Show loading spinner or empty until AI response is received */}
              {isLoading && chat.response === "" ? (
                <AnswerBox message="..." sender={false} />
              ) : (
                <AnswerBox message={chat.response} sender={false} />
              )}
            </div>
          ))}
        </div>

        {/* Form to submit questions */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="chat" className="sr-only">Your message</label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id="chat"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
