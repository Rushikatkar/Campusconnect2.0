import { useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css';

export default function Forgotpassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/v1/auth/forgot-password', {
                email,
            });

            // Assuming your backend sends back a success message
            setSuccessMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                // Server responded with an error status code (e.g., 400 Bad Request)
                setError('Password reset request failed. Please check your email address.');
            } else {
                // Network error or other unexpected issues
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="leftcomp">
                    <span className="signup">Reset Password</span>
                    <p>Enter your email address, and we will send you an email with instructions to reset your password.</p>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="forminput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <button type="submit" className="formsubmit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
