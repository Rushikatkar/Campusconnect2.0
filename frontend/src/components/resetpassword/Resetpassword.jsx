import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Resetpassword.css";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    // If you want to handle token changes dynamically
    const newToken = searchParams.get('token');
    if (newToken !== token) {
      // Handle token change, e.g., update state or perform other actions
    }
  }, [token, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/auth/reset-password",
        {
          password,
          token,
        }
      );

      // Assuming your backend sends back a success message
      // Redirect to a login page or another page after a successful password reset
      // Replace '/login' with the actual path you want to redirect to
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError("Password update failed. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="leftcomp">
          <span className="signup">Update Password</span>
          <p>Enter your new password</p>
          <input
            type="password"
            placeholder="Password"
            className="forminput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="formsubmit">
            Update Password
          </button>
        </div>
        <div className="rightcomp">
          <img src="/WIS.jpg" alt="WIS logo" />
        </div>
      </form>
    </div>
  );
}

export default Resetpassword;
