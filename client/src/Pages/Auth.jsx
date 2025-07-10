import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import logo from './logo.png'; // ✅ your logo path
import { Context } from '../Context/Context';

const Auth = () => {
  const { User, userDipatch, handleSignInUp } = useContext(Context);

  const [formData, setFormData] = useState({
    uniqueNo: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    uniqueNo: Yup.string()
      .matches(/^\d+$/, 'Unique Number must contain only digits')
      .min(10, 'Unique Number must be at least 10 digits')
      .max(15, 'Unique Number cannot be more than 15 digits')
      .required('Unique Number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password cannot be longer than 15 characters')
      .required('Password is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      // ✅ Dispatch START to show spinner
      userDipatch({ type: 'START' });

      const res = await handleSignInUp(formData);

      if (res.status === 200) {
        userDipatch({ type: 'SIGN_SUCCESS', payload: res.data.user });
        alert('Success!');
      } else {
        userDipatch({ type: 'SIGN_FAILED' });
        alert('Failed!');
      }
    } catch (err) {
      userDipatch({ type: 'SIGN_FAILED' });

      if (err.name === 'ValidationError') {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error(err);
          
        alert('Failed to authenticate. ',err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Yak Yak Logo" className="h-16 w-16 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Yak Yak</h1>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">
          Login / Signup
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Unique Number
            </label>
            <input
              type="text"
              name="uniqueNo"
              value={formData.uniqueNo}
              onChange={handleChange}
              placeholder="10–15 digit unique number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              disabled={User.loading}
            />
            {errors.uniqueNo && (
              <p className="text-red-500 text-sm mt-1">{errors.uniqueNo}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 8, max 15 characters"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              disabled={User.loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={User.loading}
            className={`w-full ${
              User.loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold py-2 rounded-lg transition duration-200`}
          >
            {User.loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Please wait...
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
