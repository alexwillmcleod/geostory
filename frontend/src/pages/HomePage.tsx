import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleScanCode = () => {
    navigate("/landing");
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
        <br />
        <div className="flex justify-center mt-4">
          <button
            className="bg-orange-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg"
            onClick={handleScanCode}
          >
            Scan Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
