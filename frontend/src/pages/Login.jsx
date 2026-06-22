import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("adminToken", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={loginAdmin} className="login-box">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;