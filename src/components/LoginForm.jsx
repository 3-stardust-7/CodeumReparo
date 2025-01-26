import React, { useState } from "react";
import { login } from "../backend/supabase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { user, error } = await login(email, password);
    if (user) {
      navigate("/");
    }
    if (error) alert("An error occurred: " + error.message);
  };

  return (
    <div className="pt-20">
      <div className="w-4/12 mx-auto bg-gray-800 text-white p-10 rounded-lg shadow-lg space-y-4">
        <h1 className="text-center font-semibold absolute text-[25px] ">
          Login To Your Account
        </h1>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-20 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-teal-600 text-white rounded-lg font-semibold shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Login
        </button>

        <p className="text-gray-300 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-400 hover:underline">
            Click here
          </Link>{" "}
          to register
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
