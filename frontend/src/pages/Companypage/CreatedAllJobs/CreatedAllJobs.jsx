import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import CompanyNavbar from '../../../components/Navbar/Companynavbar';
import Footer from '../../../components/Footer/Footer';

const JobCard = ({ job, onViewCandidates }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Highlight keywords in the description
    const highlightKeywords = description => {
        // Keywords to highlight
        const keywords = ['Qualifications', 'Responsibilities'];

        // Loop through keywords and highlight them
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
                <button onClick={() => onViewCandidates(job._id)} className="text-white hover:text-white text-sm font-semibold focus:outline-none bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md transition duration-300">View Candidates</button>
            </div>
        </div>
    );
};

const CreatedAllJobs = () => {
    const [jobs, setJobs] = useState([]);

    // Function to get userId from token
    const getUserIdFromToken = () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            console.log('userid is ' + decodedToken._id);
            return decodedToken._id;
        }
        return null;
    };

    // Function to fetch all created jobs for the logged-in user
    const fetchAllCreatedJobs = async () => {
        const userId = getUserIdFromToken(); // Get userId from token
        console.log(userId);
        if (userId) {
            try {
                // Make GET request to fetch all created jobs for the user
                const response = await axios.get(`http://localhost:5000/api/v1/company/allcreatedjobs?userId=${userId}`);
                console.log('All created jobs:', response.data); // Log the result
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching created jobs:', error);
            }
        }
    };

    // Call fetchAllCreatedJobs function when the component mounts
    useEffect(() => {
        fetchAllCreatedJobs();
    }, []); // Empty dependency array to ensure useEffect runs only once when component mounts

    const handleViewCandidates = (jobId) => {
        console.log('View Candidates for job:', jobId);
        // Here you can perform further actions, such as making an API call with the jobId
        window.location.href = `/job/${jobId}`;
    };

    return (
        <>
            <div>
                <CompanyNavbar />
            </div>
            <div>
                {jobs.map(job => (
                    <JobCard key={job._id} job={job} onViewCandidates={handleViewCandidates} />
                ))}
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default CreatedAllJobs;
