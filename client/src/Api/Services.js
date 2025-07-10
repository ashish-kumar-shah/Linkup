import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "/api/services/user", // change this to your server
  withCredentials: true, // ✅ Send cookies like JWT token cookie
  headers: {
    "Content-Type": "application/json",
    // Add more default headers if needed
  },
});

export const getUsers = async()=>{
    try {
        const respose = await API.get('/fetchUser');
        return respose
    } catch (error) {
        console.log(error);
        
    }
}
export const getUsersbyId = async(id)=>{
    try {
        const respose = await API.get(`/fetchUser/${id}`);
        return respose
    } catch (error) {
        console.log(error);
        
    }
}


export const markseen = async(from)=>{
    try {
        const data = {from}
          const respose =await API.post('/markseen',data) ;
          return respose.data
    } catch (error) {
        console.log('error while updating read',error);
        
    }
}


export const updateAvtar = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await API.patch("/updateavtar", formData,{
       headers: { "Content-Type": "multipart/form-data" },
    }); // ✅ No manual Content-Type!

    return response.data;
  } catch (error) {
    console.log('Error while uploading avatar:', error);
    throw error;
  }
};

export const updateFieldsUser = async (data)=>{
try {
  const response = await API.patch("/updatefields", data);
 
  return response.data;
} catch (error) {
  console.log('error while upload', error);
  
}
}