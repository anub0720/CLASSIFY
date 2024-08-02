import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatpage.css"; // Ensure the CSS file is imported
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

const Chatpage = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="chatpage-container">
      <h1 className="text-3xl font-bold text-center mb-4">Chatbot</h1>

      <div className="chat-container rounded-lg shadow-md p-4">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="flex mt-4 justify-center items-center">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className={`chat-button ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={sendMessage}
          disabled={isLoading}
          style={{ backgroundColor: "#00BFFF" }}
        >
          <span style={{ color: "#040278" }}>Send</span>
        </button>
      </div>
      <button
        className={`chat-button mt-4 ${isLoading ? "bg-gray-400" : "bg-gray-400 hover:bg-gray-500"}`}
        onClick={clearChat}
        style={{ backgroundColor: "#00BFFF" }}
      >
        <span style={{ color: "#00008B" }}>Clear Chat</span>
      </button>
    </div>
  );
};

export default Chatpage;
