import React, { useState, useEffect } from 'react';
import axios from 'axios';

import JobCardforCampus from '../../../components/jobCardforCampus/JobCardforCampus';

const ViewAllJobs = () => {
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
                    <JobCardforCampus key={job._id} job={job} />
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
        </div>
    );
};

export default ViewAllJobs;
