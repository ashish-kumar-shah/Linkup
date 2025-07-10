import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../Context/Context";

const MessageBox = ({
  to,
  senderAvtar,
  receiverAvtar,
  currentUserId,
  crtmsg,
}) => {
  const { getMessages, formatTimeOrDate, Socket, activeChat, markseen } =
    useContext(Context);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);


  useEffect(() => {
    getMessages(to)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [to]);

  useEffect(() => {
    if (crtmsg === null) return;
    setMessages((prev) => [...prev, crtmsg]);
  }, [crtmsg]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      requestAnimationFrame(() => {
        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!Socket) return;

    let typingTimeout;

    const handleIncoming = (msg) => {
      if (activeChat) {
        markseen(activeChat)
          .then(() => {
            msg.isRead = true;
            setMessages((prev) => [...prev, msg]);
            setMessages((prev) =>
              prev.map((m) =>
                m.from === msg.from ? { ...m, isRead: true } : m
              )
            );
          })
          .catch(() => {
            setMessages((prev) => [...prev, msg]);
          });
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleTyping = ({ from }) => {
      if (from === to) {
        setIsTyping(true);
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => setIsTyping(false), 2000);
      }
    };

 

    Socket.on("send-message", handleIncoming);
    Socket.on("typing", handleTyping);
    Socket.on("stop-typing", () => setIsTyping(false));


    return () => {
      Socket.off("send-message", handleIncoming);
      Socket.off("typing", handleTyping);
      Socket.off("stop-typing");

    };
  }, [Socket, to, activeChat, markseen]);

  return (
    <div className="w-full h-full p-4 overflow-y-auto flex flex-col gap-2">
      {messages.map((msg,i) => {
        const isSender =
          msg.from === currentUserId || msg.from?._id === currentUserId;

        return (
          <div
            key={i}
            className={`flex items-end ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {!isSender && (
              <img
                src={receiverAvtar}
                alt="receiver"
                className="w-8 h-8 rounded-full mr-2 shrink-0"
              />
            )}
            <div
              className={`flex items-end px-4 py-2 rounded-lg max-w-[75%] ${
                isSender
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <span className="text-sm break-words">{msg.message}</span>
              <span className="ml-2 text-[10px] text-black opacity-100 self-end whitespace-nowrap">
                {formatTimeOrDate(msg.createdAt)}
              </span>

              {/* {isSender && (
                <span
                  className="material-symbols-outlined pl-4"
                  style={{
                    fontSize: "20px",
                    color: msg.isRead ? "yellow" : "inherit",
                  }}
                >
                  {msg.isRead ? "done_all" : "check_small"}
                </span>
              )} */}
            </div>
            {isSender && (
              <img
                src={senderAvtar}
                alt="sender"
                className="w-8 h-8 rounded-full ml-2 shrink-0"
              />
            )}
          </div>
        );
      })}
      {isTyping && <span className="text-xs text-gray-500">Typing...</span>}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageBox;
