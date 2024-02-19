import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import css from "./Login.module.css";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/admins/login", // Changed API endpoint for admin login
                { email, username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Login response:", response.data); // Log the response for debugging

            const { data } = response.data; // Destructure the response

            if (!data) {
                throw new Error("Invalid response format");
            }

            const { accessToken, refreshToken, admin } = data; // Access data from the response

            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("Admin:", admin);

            // Set cookies with appropriate options
            Cookies.set("accessToken", accessToken, { path: '/', secure: true, sameSite: 'strict' });
            Cookies.set("refreshToken", refreshToken, { path: '/', secure: true, sameSite: 'strict' });

            navigate("/admin");
        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setError("Invalid email, username, or password."); // Update error message
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <div>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.leftcomp}>
                        <span className={css.signup}>Admin Log In</span> {/* Updated title */}
                        <input
                            type="email"
                            placeholder="Email address"
                            className={css.forminput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="text" // Change type to text for username
                            placeholder="Username"
                            className={css.forminput}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={css.forminput}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className={css.forgot}>
                            <a href="#">Forgot Password?</a>
                        </span>
                        {error && <p className={css.error}>{error}</p>}
                        <button type="submit" className={css.formsubmit}>
                            Log In
                        </button>
                        <p className={css.signin}>
                            Already have an account? <a href="#">SignUp</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
