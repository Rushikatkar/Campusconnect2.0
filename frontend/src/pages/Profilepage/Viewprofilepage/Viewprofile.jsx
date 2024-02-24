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
                console.log("userid is " + decodedToken._id);
                return decodedToken._id;
            }
            return null;
        };

        const userId = getUserIdFromToken();
        if (userId) {
            setIsLoading(true);
            axios.get(`http://localhost:5000/api/profile?userId=${userId}`)
                .then(response => {
                    const userProfile = response.data.userProfile;
                    setUserData(userProfile);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    return (
        <>
            <StudentNavbar />
            <div className="container mx-auto p-8 bg-white shadow-xl rounded-md">
                <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
                {userData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Student image</label>
                                <img src={userData.avatar} alt='User Image' className="w-32 h-32 rounded-full" />
                            </div>
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
                        </div>
                        <div>
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
                    <p>Loading user data...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Viewprofile;
