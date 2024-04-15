import React, { useState } from 'react';

const CustomJobCard = ({ job, onViewCandidates }) => {
    const [showAllDetails, setShowAllDetails] = useState(false);

    const toggleDetails = () => {
        setShowAllDetails(!showAllDetails);
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
                Discription: {showAllDetails ? (
                    <div className="text-sm text-gray-700">
                        {job.description}<br />
                        Company URL: <a href={job.company_url}>{job.company_url}</a><br />
                        How to Apply: <a href={job.how_to_apply}>{job.how_to_apply}</a><br />
                        College Name: {job.college_name}<br />
                        Departments: {job.department.join(', ')}<br />
                        HSC Marks: {job.hscmarks}<br />
                        CGPA: {job.cgpa}<br />
                        Backlogs: {job.backlogs}
                    </div>
                ) : (
                    <div className="text-sm text-gray-700">{job.description.substring(0, 200)}...</div>
                )}
                <button onClick={toggleDetails} className="text-white hover:text-white text-sm font-semibold focus:outline-none">
                    {showAllDetails ? 'Show Less' : 'Show More'}
                </button>
            </div>
            <div className="px-4 py-2">
                <button onClick={() => onViewCandidates(job._id)} className="text-white hover:text-white text-sm font-semibold focus:outline-none bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md transition duration-300">View Status</button>
            </div>
        </div>
    );
};

export default CustomJobCard;
