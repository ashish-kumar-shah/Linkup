import React, { useState, useContext, useRef } from "react";
import { Context } from "../../Context/Context";

const ProfilePicInput = () => {
  const { User, updateAvtar, userDispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const res = await updateAvtar(file); // ✅ CALL CONTEXT FUNCTION
      if (res.success) {
        userDispatch({ type: "UPDATE_AVATAR", payload: res.user.avtar });
      } else {
        console.error("Avatar update failed:", res.message);
      }
    } catch (err) {
      console.error("Avatar update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <div className="relative w-28 h-28 mb-3">
        <img
          src={User?.user?.avtar}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border border-gray-300 shadow"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow hover:bg-blue-700 transition"
        >
          📷
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
};

export default ProfilePicInput;
