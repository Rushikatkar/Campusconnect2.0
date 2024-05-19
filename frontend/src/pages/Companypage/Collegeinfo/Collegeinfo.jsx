import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Collegeinfo() {
    const [admins, setAdmins] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/company/collegeadmins');
                setAdmins(response.data.admins);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleContactClick = (admin) => {
        setCurrentAdmin(admin);
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/email/send-email', {
                toEmail: currentAdmin.email,
                subject,
                htmlContent: message,
            });
            console.log('Email sent successfully:', response.data);
            setShowForm(false);
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">College Admins</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {admins.map((admin) => (
                    <div key={admin._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <div className="px-6 py-4">
                            <p className="text-xl font-bold mb-2">College Name: {admin.collegeName}</p>
                            <p className="text-gray-700 text-base mb-2">Name: {admin.fullName}</p>
                            <p className="text-gray-700 text-base mb-2">Email: {admin.email}</p>
                            <p className="text-gray-700 text-base mb-2">Contact: {admin.contact}</p>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleContactClick(admin)}
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Contact {currentAdmin.fullName}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Send
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
