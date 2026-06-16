import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✓ Login successful");
        localStorage.setItem("token", data?.token || "");
        setEmail("");
        setPassword("");
      } else {
        setMessage(`✗ ${data?.msg || "Login failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("✗ Login request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p className={message.includes("✓") ? "success" : "error"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
