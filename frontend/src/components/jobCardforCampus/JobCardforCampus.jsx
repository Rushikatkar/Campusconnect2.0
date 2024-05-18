import React, { useState } from 'react';
import axios from 'axios';

const JobCardforCampus = ({ job }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [deleted, setDeleted] = useState(false); // State variable to control re-rendering

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Highlight keywords in the description
    const highlightKeywords = (description) => {
        // Keywords to highlight
        const keywords = ['Qualifications', 'Responsibilities'];

        // Loop through keywords and highlight them
        keywords.forEach((keyword) => {
            description = description.replace(new RegExp(keyword, 'gi'), `<strong>${keyword}</strong>`);
        });

        return description;
    };

    const handleDelete = async (_id) => {
        console.log(_id);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/campus/deletejob', {
                _id // Ensure you're sending the correct job ID
            });

            // Check if the response indicates a successful deletion
            if (response.status === 200) {
                setSuccessMessage('Job deleted successfully!');
                setErrorMessage('');
                setDeleted(true); // Update the state to trigger a re-render
            } else {
                setErrorMessage('Failed to delete job. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            setErrorMessage('Error deleting job. Please try again.');
            setSuccessMessage('');
        }
    };

    if (deleted) {
        return null; // Render nothing if the job is deleted
    }

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
                <button onClick={toggleDescription} className="text-black hover:underline text-sm font-semibold focus:outline-none">
                    {showFullDescription ? 'View Less' : 'View More'}
                </button>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between">
                <button target="_blank" rel="noopener noreferrer" className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Update</button>
                <button onClick={() => handleDelete(job._id)} className="text-white bg-red-500 hover:bg-red-600 text-sm font-semibold focus:outline-none py-2 px-4 rounded-md transition duration-300">Delete</button>
            </div>
            {errorMessage && <div className="p-4 bg-red-100 text-red-700">{errorMessage}</div>}
            {successMessage && <div className="p-4 bg-green-100 text-green-700">{successMessage}</div>}
        </div>
    );
};

export default JobCardforCampus;
