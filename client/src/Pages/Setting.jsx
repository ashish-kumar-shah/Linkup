import React, { useContext, useState } from "react";
import EditableField from "../Component/Settings/EditableField";
import ProfilePicInput from "../Component/Settings/ProfilePicInput";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";

const Setting = () => {
  const { handleLogout, userDipatch, User } = useContext(Context);

  const navigate = useNavigate();
  const [name, setName] = useState(User?.user?.name);
  const [password, setPassword] = useState("************");

  const handleLogoutfunc = async () => {
    const res = await handleLogout();
    if (res.success) {
      navigate("/auth/user/sign");
      userDipatch({ type: "LOGOUT_SUCEESS" });
    } else {
      userDipatch({ type: "LOGOUT_FAILED" });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 space-y-6 h-full overflow-y-auto hide-scrollbar">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      <hr />
      <ProfilePicInput />
      <EditableField label="Name" value={name} onSave={setName} name={"name"} />

      {/* 🔒 Secret field REMOVED from editable list */}

      <EditableField
        label="Password"
        value={password}
        type="password"
        onSave={setPassword}
        name={"password"}
        requireSecret={true} // 👈 add this
      />
      <hr />
      <div className="pt-6 ">
        <button
          onClick={handleLogoutfunc}
          className="w-full px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;
