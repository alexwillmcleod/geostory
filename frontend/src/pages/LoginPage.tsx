import React from "react";
import { useNavigate } from "react-router";


const HomePage = () => {

  const navigate = useNavigate();

  const handleLogin = (id: any) => {
    navigate("/login");
  };

  const handleSignUp = () => {
    // Handle sign up logic
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-5xl text-center mb-8 font-bold">GeoStory</div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg mr-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
