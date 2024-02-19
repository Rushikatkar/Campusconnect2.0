import { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function AdminSignup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [collegeName, setCollegeName] = useState(""); // Added collegeName state
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adminData = {
                fullName,
                email,
                username,
                password,
                collegeName, // Include collegeName in the admin data
            };

            const response = await axios.post(
                "http://localhost:5000/api/v1/admins/register", // Updated API endpoint for admin registration
                adminData
            );

            // Assuming your backend sends back a success message or admin data
            // Redirect or perform actions after successful signup
            // Replace '/login' with the actual path you want to redirect to
            window.location.href = "http://localhost:3000/adminlogin";
        } catch (error) {
            if (error.response) {
                // Server responded with an error status code (e.g., 400 Bad Request)
                setError("Registration failed. Please check your details.");
            } else {
                // Network error or other unexpected issues
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="leftcomp">
                    <span className="signup">Admin Sign Up</span> {/* Updated title */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="forminput"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="forminput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="forminput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="forminput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="College Name" // Added input field for collegeName
                        className="forminput"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="formsubmit">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}
