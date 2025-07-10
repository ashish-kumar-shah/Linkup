import React, { useEffect, useReducer, useState } from "react";
import { Context } from "./Context";
import AuthReducer from "../Reducer/AuthReducer";
import {
  authenticatUser,
  handleSignInUp,
  updateFields,
  handleLogout,
} from "../Api/User";
import { sendMessage, getMessages } from "../Api/Message";
import {
  getUsers,
  getUsersbyId,
  markseen,
  updateAvtar,
  updateFieldsUser,
} from "../Api/Services";
import useIsMobile from "../Utility/Mobile";
import formatTimeOrDate from "../Utility/FormatTimeDate";
import Socket from "../Socket";

const ContextApi = ({ children }) => {
  const initialUser = {
    user: null,
    loading: true,
    authenticate: false,
  };

  const [User, userDipatch] = useReducer(AuthReducer, initialUser);
  const [activeChat, setActiveChat] = useState(null);
  const [userStatus, setUserStatus] = useState("offline");

  useEffect(() => {
    authenticatUser()
      .then((res) => {
        if (res.status === 200) {
          userDipatch({ type: "AUTH_SUCCESS", payload: res.data.user });
        } else {
          userDipatch({ type: "AUTH_FAILED" });
        }
      })
      .catch(() => {
        userDipatch({ type: "AUTH_FAILED" });
      });
  }, []);

  useEffect(() => {
    if (User?.user?._id && !Socket.connected) {
      Socket.connect();

      Socket.on("connect", () => {
      
        Socket.emit("register", User.user._id);
        setUserStatus("online");
      });

      Socket.on("disconnect", () => {
       
        setUserStatus("offline");
      });
    }

    return () => {
      Socket.off("connect");
      Socket.off("disconnect");
    };
  }, [User.user?._id]);

  return (
    <Context.Provider
      value={{
        User,
        userDipatch,
        authenticatUser,
        handleSignInUp,
        updateFields,
        sendMessage,
        getMessages,
        Socket,
        getUsers,
        getUsersbyId,
        markseen,
        activeChat,
        setActiveChat,
        userStatus,
        setUserStatus,
        updateAvtar,
        updateFieldsUser,
        handleLogout,

        // utility
        useIsMobile,
        formatTimeOrDate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextApi;
