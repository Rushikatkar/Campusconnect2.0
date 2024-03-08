import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';

const Viewprofile = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                console.log('userid is ' + decodedToken._id);
                return decodedToken._id;
            }
            return null;
        };

        const fetchData = async () => {
            const userId = getUserIdFromToken();
            if (userId) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/api/profile?userId=${userId}`);
                    setUserData(response.data.userProfile);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    const handleDownload = async (base64Data, filename) => {
        try {
            let base64String;

            if (typeof base64Data === 'string') {
                // If base64Data is already a string, use it directly
                base64String = base64Data;
            } else if (base64Data && Array.isArray(base64Data.data)) {
                // If base64Data is an object with a 'data' array, convert it to a base64 string
                base64String = base64Data.data.join('');
            } else {
                throw new Error('Invalid base64Data format');
            }

            // Convert base64 string to ArrayBuffer
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const arrayBuffer = byteArray.buffer;

            // Create Blob from ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

            // Create URL for Blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element for download
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;

            // Append the link to the document body and trigger click event
            document.body.appendChild(a);
            a.click();

            // Cleanup
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };




    return (
        <>
            <StudentNavbar />
            <div className="container mx-auto p-8 bg-white shadow-xl rounded-md">
                <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
                {isLoading ? (
                    <p>Loading user data...</p>
                ) : userData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Student image</label>
                                <img src={userData.avatar} alt="User Image" className="w-32 h-32 rounded-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Student Name</label>
                                <p>{userData.student_name}</p>
                            </div>
                            {userData.resume && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Resume</label>
                                    <button onClick={() => handleDownload(userData.resume.data, 'resume.pdf')}>
                                        Download Resume
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                                <p>{userData.date_of_birth}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                <p>{userData.address}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">College Name</label>
                                <p>{userData.college_name}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Marks of SSC</label>
                                <p>{userData.marksofssc}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Diploma CGPA</label>
                                <p>{userData.diploma_cgpa}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Diploma Backlogs</label>
                                <p>{userData.diploma_backlogs}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Degree CGPA</label>
                                <p>{userData.degree_cgpa}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Degree Backlogs</label>
                                <p>{userData.degree_backlogs}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No user data available.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Viewprofile;
