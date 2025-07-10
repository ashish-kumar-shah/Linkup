import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "/api/auth/user", // change this to your server
  withCredentials: true, // ✅ Send cookies like JWT token cookie
  headers: {
    "Content-Type": "application/json",
    // Add more default headers if needed
  },
});

export const handleSignInUp = async (formdata) => {
  try {
    const response = await API.post("/signinup", formdata);
 
    return response;
  } catch (error) {
    console.log("Error while halding user credential ", error);
  }
};

export const authenticatUser = async ()=>{
    try {
        const response = await API.get('/verify');
    
        console.log(response)
        return response
    } catch (error) {
        console.log('error while authenticate user',error);
        
    }
}

export const updateFields =async (formdata)=>{
   try {
    const  response = await API.post('/Updatefield',formdata)
    return response
   } catch (error) {
        console.log('error while updating user',error);
    
   }
}

export const handleLogout = async () => {
  try {
    const response = await API.get("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error?.response || error);
    throw error;
  }
};