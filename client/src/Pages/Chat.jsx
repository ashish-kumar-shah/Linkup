import React, { useContext, useEffect, useState } from "react";
import Header from "../Component/Chat/Header";
import { Context } from "../Context/Context";
import Input from "../Component/Chat/Input";
import MessageBox from "../Component/Chat/MessageBox";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { activeChat, getUsersbyId, User, setActiveChat } = useContext(Context);
  const [chatUser, setChatUser] = useState(null);
  const [currMsg, setCurrMsg] = useState(null);
   const {id} = useParams()
  useEffect(() => {
     !activeChat && setActiveChat(id)
    if (activeChat) {
      getUsersbyId(activeChat)
        .then((res) => {
          setChatUser(res.data);
        })
        .catch((err) => {
         
          setChatUser(null);
        });
    }
  }, [activeChat]);

  return (
    chatUser && (
      <div className="w-full h-full flex flex-col bg-white ">
        {/* ✅ Header: fixed height */}
        <Header
          avtar={chatUser?.avtar}
          name={chatUser?.name}
          userId={chatUser?._id}
        />

        {/* ✅ Message area: flex-1 scrollable */}

        <MessageBox
          to={chatUser?._id}
          senderAvtar={User?.user?.avtar}
          receiverAvtar={chatUser?.avtar}
          currentUserId={User?.user?._id}
          crtmsg={currMsg}
        />

        {/* ✅ Input: fixed at bottom */}

        <Input to={chatUser?._id} from={User?.user?._id} crtmsg={setCurrMsg} />
      </div>
    )
  );
};

export default Chat;
