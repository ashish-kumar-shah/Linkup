import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./Context/Context";
import MiddleValidator from "./MiddleValidator";

const PrivateRoute = ({ children }) => {
  const { User } = useContext(Context);
  const [showValidator, setShowValidator] = useState(false);
console.log('from private route :  ',User);

  useEffect(() => {
    if (User.authenticate && User?.user?.name === "NewUser") {
      setShowValidator(true);
    } else {
      setShowValidator(false);
    }
  }, [User.authenticate, User?.user?.name]);

  if (User.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-12 w-12 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (showValidator) return <MiddleValidator />;

  return User.authenticate ? children : <Navigate to="/auth/user/sign" replace />;
};

export default PrivateRoute;


