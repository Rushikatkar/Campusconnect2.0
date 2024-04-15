import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AdminNavbar from '../../../../components/Navbar/AdminNavbar';
import Footer from '../../../../components/Footer/Footer';

const ViewAdminProfile = () => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getAdminIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                console.log('adminId is ' + decodedToken._id);
                return decodedToken._id;
            }
            return null;
        };

        const fetchData = async () => {
            const adminId = getAdminIdFromToken();
            if (adminId) {
                setIsLoading(true);
                try {
                    const response = await axios.post('http://localhost:5000/api/v1/admins/viewadminprofile', { adminId });
                    setAdminProfile(response.data.adminProfile[0]);
                } catch (error) {
                    console.error('Error fetching admin profile:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto p-8 bg-white shadow-xl rounded-md">
                <h2 className="text-2xl font-semibold mb-6">Admin Profile</h2>
                {isLoading ? (
                    <p>Loading admin profile...</p>
                ) : adminProfile ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Admin Name</label>
                                <p>{adminProfile.admin_name}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <p>{adminProfile.email}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Contact</label>
                                <p>{adminProfile.contact}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">College Name</label>
                                <p>{adminProfile.college_name}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
                                <p>{adminProfile.experience} years</p>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Departments</label>
                                {adminProfile.departments.map((department, index) => (
                                    <div key={index} className="mb-2">
                                        <p className="font-semibold">{department.department_name}</p>
                                        <div className="flex flex-wrap">
                                            {Object.keys(department.students).map(year => (
                                                <div key={year} className="flex items-center mr-4 mb-2">
                                                    <span className="text-gray-600 mr-1">{year}:</span>
                                                    <span className="text-green-600">{department.students[year]} students</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No admin profile available.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ViewAdminProfile;
