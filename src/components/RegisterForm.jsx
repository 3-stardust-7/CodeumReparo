import React, { useState } from "react";
import { register } from "../backend/supabase/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { user, error } = await register(email, password);
    if (user) {
      navigate("/");
    }
    if (error) alert("An error occurred: " + error.message);
  };

  return (
    <div className="pt-20">
      <div className="w-4/12 mx-auto bg-gray-800 text-white p-10 rounded-lg shadow-lg space-y-4">
        <h1 className="text-center font-semibold text-[25px] mb-10">
          Create An Account
        </h1>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-grey-700 text-black rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 p-3 bg-gray-700 text-white rounded-lg oborder border-gray-600 focus:outline-none focus:invisible focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full p-3 bg-teal-600 text-white rounded-lg font-semibold shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Register
        </button>

        <p className="text-gray-300 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Click here
          </Link>{" "}
          to login
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
