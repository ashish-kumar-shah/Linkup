import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import {useNavigate} from 'react-router-dom'

const UserListCard = ({ data  }) => {
  const { formatTimeOrDate, setActiveChat, Socket, activeChat ,markseen ,useIsMobile} = useContext(Context);

  const [latestMessage, setLatestMessage] = useState(data.latestMessage);
  const [unreadCount, setUnreadCount] = useState(data.unreadCount || 0);

  const isMobile = useIsMobile()
  const navigate = useNavigate()



  useEffect(() => {
    if (!Socket) return;

    const handleLatest = (msg) => {
      if (msg.from === data._id || msg.to === data._id) {
        setLatestMessage(msg);
        if (activeChat !== data._id) {
          setUnreadCount((prev) => prev + 1);
        }
      }
    };

    const handleSeen = ({ from }) => {
      if (from === data._id) {
        setUnreadCount(0);
      }
    };

    Socket.on("latest-message", handleLatest);
    Socket.on("seen-message", handleSeen);

    return () => {
      Socket.off("latest-message", handleLatest);
      Socket.off("seen-message", handleSeen);
    };
  }, [Socket, data._id, activeChat]);



  const handleSeenMessage = (id)=>{
    setActiveChat(id)
isMobile && navigate(`/chat/${id}`)
  
markseen(id).then(res=>{
  setUnreadCount(0)
}).catch(err=>{
  console.log(err);
  
})

  }
  return (
    <div
      className="w-full px-3 py-2 hover:bg-green-100 cursor-pointer flex items-center transition duration-200 rounded"
    
      onClick = { ()=>handleSeenMessage(data._id)}
    >
      <div className="flex-shrink-0">
        <img
          src={data?.avtar || "/default-avatar.png"}
          alt="avatar"
          className="w-12 h-12 md:w-10 md:h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 ml-3">
        <div className="flex justify-between items-center">
          <h4 className="text-base md:text-sm font-semibold text-gray-900">
            {data?.name || "Unknown User"}
          </h4>
        </div>
        <p className="text-sm md:text-xs text-gray-600 truncate sm:max-w-32 md:max-w-56">
          {latestMessage?.message}
        </p>
      </div>

      <div className="ml-3 flex-shrink-0 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-900 flex-shrink-0 ml-4">
          {formatTimeOrDate(latestMessage?.createdAt)}
        </span>
        {unreadCount > 0 && (
          <span className="inline-block min-w-[20px] text-center bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserListCard;
