// JobsComponent.js
import React from 'react';
import AddnewJob from './AddnewJob';
import ViewAllJobs from './ViewAllJobs';

const JobsComponent = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Jobs Information</h1>
            {/* Add your job-related information here */}
            <AddnewJob />
            <ViewAllJobs />
        </div>
    );
};

export default JobsComponent;
