import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyNavbar from '../../../../components/Navbar/Companynavbar';
import Footer from '../../../../components/Footer/Footer';

const JobCandidatesPage = () => {
    // Extract jobId from the URL
    const jobId = window.location.pathname.split('/').pop();
    const [jobData, setJobData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Make a GET request to the API with jobId as input
        axios.post(`http://localhost:5000/api/jobappied`, { jobId })
            .then(response => {
                console.log('Response from API:', response.data);
                setJobData(response.data.data || []); // Assuming response.data contains an array of objects
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job candidates:', error);
                setIsLoading(false);
            });
    }, [jobId]); // Run this effect whenever jobId changes

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
            <div>
                <CompanyNavbar />
            </div>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-6">Student Profiles Applied For This Job</h2>

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
                ) : (
                    <p>No candidates have applied for this job role.</p>
                )}
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default JobCandidatesPage;
