import React, { useState, useEffect } from 'react';
import axios from 'axios';

import JobCard from '../../../components/jobCard/JobCard'; // Path to the JobCard component
import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10); // Number of jobs to display per page

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get current jobs based on pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <div>
                <StudentNavbar />
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md py-2 px-4 pl-10"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500 absolute right-3 top-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 15l5-5m0 0l-5-5m5 5H4"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <div className="job-list mt-4">
                {currentJobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default ViewJobs;
