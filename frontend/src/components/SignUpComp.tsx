import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [name, setEmail] = useState("");
  const [email, setPassword] = useState("");
  const [password, setConfirmPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Sign-up submitted");
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="bg-white rounded-lg p-6 shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="email"
            id="email"
            value={name}
            onChange={handleEmailChange}
            required
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Sign Up
        </button>
        <Link to="/homepage">
          <button className="mt-4 text-blue-500 hover:text-blue-600 font-semibold">
            Go Back Home
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
