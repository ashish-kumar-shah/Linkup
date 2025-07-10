import React, { useState, useContext, useRef } from "react";
import { Context } from "../../Context/Context";

const Input = ({ to, from, crtmsg }) => {
  const [message, setMessage] = useState("");
  const { sendMessage, Socket, activeChat } = useContext(Context);
  const typingTimeout = useRef(null);

  const handleSend = async () => {
    if (message.trim() === "") return;
    crtmsg({ from: { _id: from }, to: { _id: to }, message,createdAt:new Date().getTime() ,isRead:false});
    await sendMessage({
      from: { _id: from },
      to: { _id: to },
      message
      
    });

    Socket.emit("stop-typing", { from, to });
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);

    Socket.emit("typing", { from, to });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      Socket.emit("stop-typing", { from, to });
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-20 px-4 py-3 flex items-center gap-3">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 border-gray-300 rounded-full px-4 py-4 bg-gray-900 text-white outline-none"
      />
      <button
        onClick={handleSend}
        className="material-symbols-outlined text-white px-4 py-4 rounded-full bg-gray-900"
      >
        Send
      </button>
    </div>
  );
};

export default Input;
