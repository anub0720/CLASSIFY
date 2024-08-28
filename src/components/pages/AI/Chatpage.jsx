import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatpage.css"; // Ensure the CSS file is imported
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Chatpage = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [chatSession, setChatSession] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_SERVER_URL
    : 'http://localhost:8080';
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchChatHistory(user.email); // Fetch chat history when user logs in
      } else {
        setUserEmail(null);
        setChatHistory([]); // Clear chat history when user logs out
      }
    });
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      const chat = model.startChat({
        history: chatHistory.map(({ type, message }) => ({
          role: type === "user" ? "user" : "model",
          parts: [{ text: message }],
        })),
        
      });
      setChatSession(chat);
    };

    initializeChat();
  }, [chatHistory,model]);

  // Function to fetch chat history
  const fetchChatHistory = async (email) => {
    try {
      const res = await fetch(`${baseURL}/Chatpage/getChatHistory?email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch chat history");
      }
      const data = await res.json();
      
      // Interleave user messages and AI responses
      const formattedHistory = data.reduce((acc, chat) => {
        acc.push(
          { type: "user", message: chat.userMessage },
          { type: "bot", message: chat.apiResponse }
        );
        return acc;
      }, []);

      setChatHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await chatSession.sendMessage(userInput);
      const response = await result.response;
      const aiResponse = response.text();

      // Add Gemini's response to the chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: aiResponse },
      ]);

      // Send data to backend
      if (userEmail) {
        const res = await fetch(`${baseURL}/Chatpage/saveChat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            userMessage: userInput,
            apiResponse: aiResponse,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error: ${errorText}`);
        }

        console.log("Chat saved successfully");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = async () => {
    setChatHistory([]);
    try {
      const response = await fetch(`${baseURL}/Chatpage/clearChat`, {
        method: 'DELETE',
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error clearing chat collection:', error);
    }
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
