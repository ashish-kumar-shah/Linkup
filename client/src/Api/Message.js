import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "/api/message/user", // change this to your server
  withCredentials: true, // ✅ Send cookies like JWT token cookie
  headers: {
    "Content-Type": "application/json",
    // Add more default headers if needed
  },  
});

export const sendMessage = async (formdata) => {
  try {
    const response = API.post("/send", formdata);
    return response;
  } catch (error) {
    console.log("Error while Send Message: ", error);
  }
};

export const getMessages = async (receiverId) => {
  try {
    const response = await API.get(`/fetch/${receiverId}`);
    return response.data; // backend sends { success: true, data: [...] }
  } catch (error) {
    console.log("Error while fetching messages:", error);
    return { success: false, data: [] }; // safe fallback
  }
};

