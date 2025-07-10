// src/socket.js
import { io } from "socket.io-client";


// Export ONE socket instance
const socket = io(
  {
  withCredentials: true,
  autoConnect: false, // connect manually when needed
});

export default socket;
