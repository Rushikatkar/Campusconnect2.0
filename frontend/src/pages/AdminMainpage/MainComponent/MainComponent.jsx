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

    const viewResume = (resume) => {
        // Create Blob from base64 string
        const blob = b64toBlob(resume.data.data, resume.contentType);

        // Create URL for the Blob
        const url = URL.createObjectURL(blob);

        // Open URL in a new tab
        window.open(url, '_blank');
    };

    const downloadResume = (resume) => {
        // Create Blob from base64 string
        const blob = b64toBlob(resume.data.data, resume.contentType);

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'resume.pdf');

        // Append link to body and trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
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

                            {student.resume && student.resume.contentType && (
                                <div className="ml-4">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => viewResume(student.resume)}>
                                        View Resume
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => downloadResume(student.resume)}>
                                        Download Resume
                                    </button>
                                </div>
                            )}

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
