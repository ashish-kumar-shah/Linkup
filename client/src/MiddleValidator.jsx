import React, { useContext, useState } from "react";
import { Context } from "./Context/Context";
import * as Yup from "yup";

const nameSchema = Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
  .min(2, "Name must be at least 2 characters")
  .max(15, "Name must be no more than 15 characters")
  .required("Name is required");

const MiddleValidator = () => {
  const { updateFields, userDipatch } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    secret: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      try {
        await nameSchema.validate(value);
        setErrors((prev) => ({ ...prev, name: "" }));
      } catch (err) {
        setErrors((prev) => ({ ...prev, name: err.message }));
      }
    }
  };

  const handleUpload = async () => {
    try {
      await nameSchema.validate(formData.name); // Final check
      console.log("Uploading:", formData);

      updateFields(formData)
        .then((res) => {
          if (res.data.success) {
            userDipatch({ type: "UPDATE_SUCCESS", payload: res.data.user });
          } else {
            userDipatch({ type: "UPDATE_FAILED" });
          }
        })
        .catch(() => {
          userDipatch({ type: "UPDATE_FAILED" });
        });
    } catch (err) {
      setErrors((prev) => ({ ...prev, name: err.message }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-gray-200 p-8 space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 mb-1 text-sm font-medium"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Roo Sharma"
              className={`w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="secret"
              className="block text-gray-700 mb-1 text-sm font-medium"
            >
              Secret
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              value={formData.secret}
              onChange={handleChange}
              placeholder="Your secret key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400"
            />
          </div>

          <button
            type="button"
            onClick={handleUpload}
            className="w-full py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg shadow-md transition"
          >
            Upload
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Roo Industries. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default MiddleValidator;
