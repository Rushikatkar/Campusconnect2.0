import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Footer from '../../../../components/Footer/Footer';
import StudentNavbar from '../../../../components/Navbar/StudentNavbar';
import Notification from '../../../../components/Notification/Notification'; // Import Notification component

export default function CampusJob() {
    const [userData, setUserData] = useState(null);
    const [campusJobData, setCampusJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState(null); // State for notification message

    const getUserIdFromToken = () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
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
                const collegeName = response.data.userProfile.college_name;
                const campusJobResponse = await axios.post('http://localhost:5000/api/campusjob', { collegeName });
                setCampusJobData(campusJobResponse.data);
                console.log('User Data:', response.data.userProfile);
                console.log('Campus Job Data:', campusJobResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const applyInCampus = async (jobId) => {
        const userId = getUserIdFromToken();
        console.log("jobId is " + jobId);
        console.log("userId is " + userId);
        if (userId) {
            try {
                const response = await axios.post('http://localhost:5000/api/campusjobapply', { userId, jobId });
                if (response.data.success === false && response.data.message === 'You have already applied for this job') {
                    // Show alert message if user has already applied
                    setNotificationMessage('You have already applied for this job');
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 3000);
                    console.log(response.data);
                } else {
                    setNotificationMessage('Applied in campus successfully'); // Set notification message
                    // Reset notification message after 3 seconds
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 3000);
                }
            } catch (error) {
                console.error('Error applying in campus:', error);
            }
        }
    };


    const JobCard = ({ job }) => {
        const [showFullDescription, setShowFullDescription] = useState(false);

        const toggleDescription = () => {
            setShowFullDescription(!showFullDescription);
        };

        const highlightKeywords = description => {
            const keywords = ['Qualifications', 'Responsibilities'];
            keywords.forEach(keyword => {
                description = description.replace(new RegExp(keyword, 'gi'), `<strong>${keyword}</strong>`);
            });
            return description;
        };

        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-1/2 mt-3">
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">{job.location}</p>
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">{job.type}</span>
                    </div>
                </div>
                <div className="px-4 py-2">
                    {showFullDescription ? (
                        <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlightKeywords(job.description) }}></div>
                    ) : (
                        <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlightKeywords(job.description.substring(0, 200)) + '...' }}></div>
                    )}
                    <button onClick={toggleDescription} className="text-white hover:text-white text-sm font-semibold focus:outline-none">
                        {showFullDescription ? 'View Less' : 'View More'}
                    </button>
                </div>
                <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between">
                    <a href={job.jobURL} target="_blank" rel="noopener noreferrer" className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Apply On Company Site</a>
                    <button onClick={() => applyInCampus(job._id)} className="text-white hover:text-white text-sm font-semibold focus:outline-none bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md transition duration-300">Apply in Campus</button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <StudentNavbar />
            </div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {userData && (
                            <div>
                                {campusJobData && (
                                    <div>
                                        <h2 className='text-center text-2xl'>Current Job Openings in College</h2>
                                        {campusJobData.jobs.map(job => (
                                            <JobCard key={job._id} job={job} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div>
                <Footer />
            </div>
            {notificationMessage && <Notification message={notificationMessage} />} {/* Render Notification component */}
        </>
    );
}
