
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Companynavbar from '../../../../components/Navbar/Companynavbar';
import Footer from '../../../../components/Footer/Footer';
import Notification from '../../../../components/Notification/Notification';

const JobCandidatePage = () => {
    const jobId = window.location.pathname.split('/').pop();
    const [jobData, setJobData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    useEffect(() => {
        axios.post(`http://localhost:5000/api/jobappied`, { jobId })
            .then(response => {
                setJobData(response.data.data || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job candidates:', error);
                setIsLoading(false);
            });
    }, [jobId]);

    const viewResume = (resume) => {
        const blob = b64toBlob(resume.data.data, resume.contentType);
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    const downloadResume = (resume) => {
        const blob = b64toBlob(resume.data.data, resume.contentType);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSelect = async (userId, email) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/company/selectstudent', { userId, jobId });
            if (response.data.success === false && response.data.message === 'Student already selected for this job') {
                setNotificationMessage('Student already selected for this job');
            } else if (response.data.success === false && response.data.message === 'Student already rejected for this job') {
                setNotificationMessage('Student already rejected for this job');
            } else {
                setNotificationMessage('Student selected successfully');

                // Send email to the selected user
                const emailData = {
                    toEmail: email, // Replace this with the user's email
                    subject: 'Congratulations!! You are selected in the interview process',
                    htmlContent: '<p>Congratulations!! You are selected in the interview process. All the other details will be share with you soon.</p>',
                };
                await axios.post('http://localhost:5000/api/email/send-email', emailData);
            }
        } catch (error) {
            console.error('Error selecting student:', error);
            setNotificationMessage('Error selecting student');
        } finally {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setNotificationMessage('');
            }, 3000);
        }
    };


    const handleReject = async (userId, email) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/company/rejectstudent', { userId, jobId });
            if (response.data.success === false && response.data.message === 'Student already rejected for this job') {
                setNotificationMessage('Student already rejected for this job');
            } else if (response.data.success === false && response.data.message === 'Student already selected for this job') {
                setNotificationMessage('Student already selected for this job');
            } else {
                setNotificationMessage('Student rejected successfully');
                // Send email to the selected user
                const emailData = {
                    toEmail: email, // Replace this with the user's email
                    subject: 'You are Rejected in the interview process',
                    htmlContent: '<p>Unfortunatnly, we are not forward with you application.</p>',
                };
                await axios.post('http://localhost:5000/api/email/send-email', emailData);
            }
        } catch (error) {
            console.error('Error rejecting student:', error);
            setNotificationMessage('Error rejecting student');
        } finally {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setNotificationMessage('');
            }, 3000);
        }
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

    const handleViewSelectedStudents = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/company/selectedstudents', { jobId });

            const userIds = Array.isArray(response.data.data) ? response.data.data : [];

            if (userIds.length === 0) {
                console.log('No userIds found in the response data.');
                return;
            }

            const studentDetailsPromises = userIds.map(userId =>
                axios.post('http://localhost:5000/api/findstudent', { userId })
            );

            const studentDetailsResponses = await Promise.all(studentDetailsPromises);
            const studentDetails = studentDetailsResponses.map(response => response.data.userProfile);

            setSelectedCandidates(studentDetails);
        } catch (error) {
            console.error('Error fetching selected students or finding students:', error);
        }
    };

    const closePopup = () => {
        setSelectedCandidates([]);
    };

    return (
        <>
            <div>
                <Companynavbar />
            </div>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-6">Student Profiles Applied For This Job</h2>
                <button onClick={handleViewSelectedStudents}>View Selected Students</button>
                {selectedCandidates.length > 0 && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={closePopup}>&times;</span>
                            {selectedCandidates.map(student => (
                                <div key={student._id} className="student-info">
                                    <h3 className="text-lg font-semibold mb-1">Student Name: {student.student_name}</h3>
                                    <p className="text-gray-600 mb-2">College Name: {student.college_name}</p>
                                    {/* Add more student information here */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <p>Loading...</p>
                ) : jobData.length > 0 ? (
                    <div className="grid gap-6">
                        {jobData.map(student => (
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
                                <div>
                                    <button onClick={() => handleSelect(student.userId, student.email)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        Select
                                    </button>
                                    <button onClick={() => handleReject(student.userId, student.email)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Reject
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No candidates have applied for this job role.</p>
                )}
            </div>
            <div>
                <Footer />
            </div>
            {showNotification && <Notification message={notificationMessage} />}
        </>
    );
};

export default JobCandidatePage;
