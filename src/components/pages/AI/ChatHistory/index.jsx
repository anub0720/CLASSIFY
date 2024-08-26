import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`flex items-start py-2 px-4 rounded-lg ${
            message.type === "user"
              ? "bg-gray-100 text-gray-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          <span className="mr-2 font-bold text-gray-600">
            <b>{message.type === "user" ? "You" : "Classify"}:</b>
          </span>

          <div>
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;

ChatHistory.propTypes = {
  chatHistory: PropTypes.array.isRequired,
};
