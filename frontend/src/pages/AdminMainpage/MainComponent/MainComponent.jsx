import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';
import { jwtDecode } from 'jwt-decode';

const MainComponent = () => {
    const [collegeName, setCollegeName] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [departmentsData, setDepartmentsData] = useState([]);

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
                        fetchAdminProfile(userId, userData.collegeName); // Pass collegeName as argument
                    } else {
                        console.error('College name not found in user data');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []); // Empty dependency array to run once on component mount

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

    const fetchAdminProfile = (userId, collegeName) => {
        const url = 'http://localhost:5000/api/v1/admins/getadminprofile';

        // Data to be sent in the body
        const data = {
            adminId: userId
        };

        // Send the request
        axios.post(url, data)
            .then(response => {
                const adminProfile = response.data?.adminProfile;
                if (adminProfile && adminProfile.length > 0) {
                    const departments = adminProfile[0].departments || [];
                    setDepartmentsData(departments);

                    // Fetch student count for each department
                    departments.forEach(department => {
                        const { department_name } = department;
                        axios.post('http://localhost:5000/api/v1/admins/getstudentofcollege', { college_name: collegeName, department_name })
                            .then(studentCountResponse => {
                                const { studentCount } = studentCountResponse.data;
                                setDepartmentsData(prevDepartmentsData => {
                                    return prevDepartmentsData.map(prevDepartment => {
                                        if (prevDepartment.department_name === department_name) {
                                            return { ...prevDepartment, studentCount };
                                        }
                                        return prevDepartment;
                                    });
                                });
                            })
                            .catch(error => {
                                console.error('Error fetching student count:', error);
                            });
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching admin profile:', error);
            });
    };

    const viewResume = (resume) => {
        const blob = b64toBlob(resume.data, resume.contentType);
        if (blob) {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } else {
            console.error('Failed to create Blob from base64 data.');
        }
    };

    const downloadResume = (resume) => {
        const blob = b64toBlob(resume.data, resume.contentType);
        if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            console.error('Failed to create Blob from base64 data.');
        }
    };


    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        try {
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
        } catch (error) {
            console.error('Failed to convert base64 string to Blob:', error);
            return null;
        }
    };


    const getTotalStudents = (studentsObj) => {
        let totalStudents = 0;
        Object.values(studentsObj).forEach(count => {
            totalStudents += count;
        });
        return totalStudents;
    };

    return (
        <>
            {/* <StudentNavbar /> */}
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-6">Student Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">College Name</label>
                    <p className="text-lg font-medium">{collegeName || 'Loading...'}</p>
                </div>
                <div className="mb-4 bg-gray-100 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">Departments and Student Counts</h3>
                    <ul>
                        {departmentsData.map((department, index) => (
                            <li key={index} className="mb-2">
                                <div className="flex justify-between items-center">
                                    <strong className="text-blue-700">{department.department_name}</strong>
                                    <span className="text-gray-500">
                                        {getTotalStudents(department.students)} students
                                        {department.studentCount && ` (${department.studentCount} profile created)`}
                                    </span>
                                </div>
                                <div className="flex flex-wrap mt-1">
                                    {Object.keys(department.students).map(year => (
                                        <div key={year} className="flex items-center mr-4 mb-2">
                                            <span className="text-gray-600 mr-1">{year}:</span>
                                            <span className="text-green-600">{department.students[year]} students</span>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
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
                                <p className="text-gray-600 mb-2"><strong>Interested In:</strong> {student.interested_domain}</p>
                                <p className="text-gray-600 mb-2"><strong>Total Projects Build:</strong> {student.number_of_project_done}</p>
                            </div>

                            {student.resume && student.resume.contentType && (
                                <div>
                                    <div className="ml-4">
                                        <p className="text-gray-600 mb-2"><strong>GitHub URL: </strong> <a className='text-blue-600' href={student.github_url}>{student.github_url}</a></p>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600 mb-2"><strong>LinkedIn URL: </strong> <a className='text-blue-600' href={student.linkedin_url}>{student.linkedin_url}</a></p>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600 mb-2"><strong>Personal Portfolio: </strong><a className='text-blue-600' href={student.portfolio_url}>{student.portfolio_url}</a></p>
                                    </div>
                                    <div className="ml-4">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => viewResume(student.resume)}>
                                            View Resume
                                        </button>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => downloadResume(student.resume)}>
                                            Download Resume
                                        </button>
                                    </div>
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
