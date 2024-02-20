import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';

const Viewprofile = () => {
    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Track image loading state

    useEffect(() => {
        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                console.log("userid is " + decodedToken._id);
                return decodedToken._id;
            }
            return null;
        };

        const userId = getUserIdFromToken();
        if (userId) {
            setIsLoading(true); // Set loading state to true
            axios.get(`http://localhost:5000/api/profile?userId=${userId}`)
                .then(response => {
                    const userProfile = response.data.userProfile;
                    if (userProfile && userProfile.image && userProfile.image.data) {
                        try {
                            const imageType = 'image/jpeg'; // Replace with the actual image type
                            const imageDataArray = new Uint8Array(userProfile.image.data.data);
                            const imageBase64 = btoa(String.fromCharCode.apply(null, imageDataArray));
                            setImageUrl(`data:${imageType};base64,${imageBase64}`);
                        } catch (error) {
                            console.error('Error processing image:', error);
                            // Handle image processing errors
                        }
                    }
                    setUserData(userProfile);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    // Handle API errors gracefully
                    // (e.g., display an error message or retry)
                })
                .finally(() => {
                    setIsLoading(false); // Set loading state to false
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
                        <img src={imageUrl} alt='User Image' style={{ width: '100px' }} />

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Student Name</label>
                            <p>{userData.student_name}</p>
                        </div>
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
