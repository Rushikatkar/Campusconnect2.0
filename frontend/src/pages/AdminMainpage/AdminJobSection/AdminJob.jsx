import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Footer from '../../../components/Footer/Footer';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';
import CustomJobCard from '../../../components/CustomJobcard/CustomJobCard';

export default function AdminJob() {
    const [userData, setUserData] = useState(null);
    const [campusJobData, setCampusJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                // console.log('admin userid is ' + decodedToken._id);
                return decodedToken._id;
            }
            return null;
        };


        const fetchData = async () => {
            const user_Id = getUserIdFromToken();
            // console.log("admin user id" + user_Id);

            if (user_Id) {
                setIsLoading(true);
                try {
                    // Fetch user data
                    const userDataResponse = await axios.post('http://localhost:5000/api/v1/admins/findadminuser', { userId: user_Id });
                    setUserData(userDataResponse.data);

                    // Extract college_name
                    const college_Name = userDataResponse.data.collegeName;
                    // console.log(college_Name);

                    // Fetch campus job data using college_name
                    const campusJobResponse = await axios.post('http://localhost:5000/api/campusjob', { collegeName: college_Name });
                    setCampusJobData(campusJobResponse.data);

                    // console.log('User Data:', userDataResponse.data); // Log user data
                    // console.log('Campus Job Data:', campusJobResponse.data); // Log campus job data
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    const handleViewCandidates = (jobId) => {
        console.log('View Candidates for job:', jobId);
        // Here you can perform further actions, such as making an API call with the jobId
        window.location.href = `/jobs/${jobId}`;
    };

    return (
        <>
            <div>
                <AdminNavbar />
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
                                            <CustomJobCard key={job._id} job={job} onViewCandidates={handleViewCandidates} />
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
