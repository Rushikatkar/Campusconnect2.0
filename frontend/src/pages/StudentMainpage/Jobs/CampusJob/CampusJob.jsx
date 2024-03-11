import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import JobCard from '../../../../components/jobCard/JobCard'; // Importing JobCard component
import Footer from '../../../../components/Footer/Footer';
import StudentNavbar from '../../../../components/Navbar/StudentNavbar';

export default function CampusJob() {
    const [userData, setUserData] = useState(null);
    const [campusJobData, setCampusJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
                    // Fetch user data
                    const response = await axios.get(`http://localhost:5000/api/profile?userId=${userId}`);
                    setUserData(response.data.userProfile);

                    // Extract college_name
                    const college_Name = response.data.userProfile.college_name;
                    console.log(college_Name);
                    // Fetch campus job data using college_name
                    const campusJobResponse = await axios.post('http://localhost:5000/api/campusjob', { collegeName: college_Name });
                    setCampusJobData(campusJobResponse.data);

                    console.log('User Data:', response.data.userProfile); // Log user data
                    console.log('Campus Job Data:', campusJobResponse.data); // Log campus job data
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);

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
                        {/* Render user data */}
                        {userData && (
                            <div>
                                {campusJobData && (
                                    <div>
                                        <h2 className='text-center text-2xl'>Current Job Openings in College</h2>
                                        {/* Render campus job data using JobCard component */}
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
        </>
    );
}
