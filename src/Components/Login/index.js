import { useState, useContext } from "react";
import UserContext from "../../../utils/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setUserName(username);
      navigate("/body");
    } else {
      alert("Please complete all fields");
    }
  };

  const isFormValid = username && password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className={`w-full bg-blue-500 text-white py-2 rounded-lg transition duration-200 ${isFormValid ? 'hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
