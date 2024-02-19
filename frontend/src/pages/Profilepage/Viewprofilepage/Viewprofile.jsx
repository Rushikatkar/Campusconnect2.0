import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';

const Viewprofile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Function to retrieve user ID from cookies
        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken'); // Retrieve access token from cookies
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                console.log("userid is " + decodedToken._id); // Log userId before making the request
                return decodedToken._id;
            }
            return null;
        };

        const userId = getUserIdFromToken(); // Get user ID from access token
        if (userId) {
            // Fetch user data from the backend API using the userId from the URL query string
            axios.get(`http://localhost:5000/api/profile?userId=${userId}`)
                .then(response => {
                    // Assuming the response.data contains user data
                    setUserData(response.data.userProfile);
                    console.log(response.data); // Access userProfile object from response data
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    return (
        <>
            <div>
                <StudentNavbar />
            </div>
            <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
                {userData ? (
                    <>
                        {/* Display user data */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student Name</label>
                            <p>{userData.student_name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                            <p>{userData.date_of_birth}</p> {/* Adjust key */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <p>{userData.address}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">College Name</label>
                            <p>{userData.college_name}</p> {/* Adjust key */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Marks of SSC</label>
                            <p>{userData.marksofssc}</p> {/* Adjust key */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Diploma CGPA</label>
                            <p>{userData.diploma_cgpa}</p> {/* Adjust key */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Diploma Backlogs</label>
                            <p>{userData.diploma_backlogs}</p> {/* Adjust key */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Degree CGPA</label>
                            <p>{userData.degree_cgpa}</p> {/* Adjust key */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Degree Backlogs</label>
                            <p>{userData.degree_backlogs}</p> {/* Adjust key */}
                        </div>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default Viewprofile;
