import React, { useState } from 'react';

const JobCard = ({ job }) => {
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
                <a href={job.jobURL} target="_blank" rel="noopener noreferrer" className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Apply On Company Site</a>
                <button className="text-white hover:text-white text-sm font-semibold focus:outline-none bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md transition duration-300">Apply in Campus</button>
            </div>
        </div>
    );
};

export default JobCard;
