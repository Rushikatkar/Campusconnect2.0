import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';
import { jwtDecode } from 'jwt-decode';

const MainComponent = () => {
    const [collegeName, setCollegeName] = useState(null);
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                return decodedToken._id;
            }
            return null;
        };

        const userId = getUserIdFromToken();
        if (userId) {
            axios.post('http://localhost:5000/api/v1/admins/findadminuser', { userId })
                .then(response => {
                    const userData = response.data;
                    if (userData && userData.collegeName) {
                        setCollegeName(userData.collegeName);
                        fetchStudentProfile(userData.collegeName);
                    } else {
                        console.error('College name not found in user data');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const fetchStudentProfile = (collegeName) => {
        const url = 'http://localhost:5000/api/v1/admins/studentprofile';

        // Data to be sent in the body
        const data = {
            college_name: collegeName
        };

        // Send the request
        axios.post(url, data)
            .then(response => {
                setStudentData(response.data);
                console.log("studentdata", response.data);
            })
            .catch(error => {
                console.error('Error fetching student profile:', error);
            });
    };

    return (
        <>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-6">Student Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">College Name</label>
                    <p className="text-lg font-medium">{collegeName || 'Loading...'}</p>
                </div>
                <div className="grid gap-6">
                    {studentData.map(student => (
                        <div key={student._id} className="bg-white p-6 rounded-md shadow-md flex items-center">
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{student.student_name}</h3>
                                <p className="text-gray-600 mb-2"><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                                <p className="text-gray-600 mb-2"><strong>Address:</strong> {student.address}</p>
                                <p className="text-gray-600 mb-2"><strong>Marks of SSC:</strong> {student.marksofssc}</p>
                                <p className="text-gray-600 mb-2"><strong>Marks of HSC:</strong> {student.marksofhsc}</p>
                                <p className="text-gray-600 mb-2"><strong>Diploma CGPA:</strong> {student.diploma_cgpa}</p>
                                <p className="text-gray-600 mb-2"><strong>Diploma BACKLOG:</strong> {student.diploma_backlogs}</p>
                                <p className="text-gray-600 mb-2"><strong>Degree CGPA:</strong> {student.degree_cgpa}</p>
                                <p className="text-gray-600 mb-2"><strong>Degree BACKLOG:</strong> {student.degree_backlogs}</p>
                            </div>

                            <div className="ml-4">
                                {student.avatar ? (
                                    <img src={student.avatar} alt="Student Image" className="w-44 h-44 rounded-full" />
                                ) : (
                                    <div className="w-44 h-44 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400 text-lg">User Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MainComponent;
