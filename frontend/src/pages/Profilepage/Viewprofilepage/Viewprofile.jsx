import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Correct import without destructuring
import { saveAs } from 'file-saver'; // Correctly import file-saver
import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';

const Viewprofile = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken); // Correct function call
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

    const isValidBase64 = (str) => {
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return base64Regex.test(str);
    };

    const handleDownload = (base64Data, filename) => {
        try {
            if (isValidBase64(base64Data)) {
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                saveAs(blob, filename); // Use file-saver to save the file
            } else {
                throw new Error('Invalid Base64 string');
            }
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
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">GitHub URL</label>
                                <a className='text-blue-700' href={userData.github_url}>{userData.github_url}</a>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn URL</label>
                                <a className='text-blue-700' href={userData.linkedin_url}>{userData.linkedin_url}</a>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Personal Portfolio</label>
                                <a className='text-blue-700' href={userData.portfolio_url}>{userData.portfolio_url}</a>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Interested Domain</label>
                                <p>{userData.interested_domain}</p>
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

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Number Of Project Done</label>
                                <p>{userData.number_of_project_done}</p>
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