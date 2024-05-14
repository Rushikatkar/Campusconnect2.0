// AdminPanel.js
import React, { useState } from 'react';
import JobsComponent from '../JobsComponent/JobsComponent';
import CompaniesComponent from '../CompaniesComponent/CompaniesComponent';
import CampusConnectLogo from '../../../@/images/CampusConnectLogoFinal.png';

const AdminPanel = () => {
    const [selectedTab, setSelectedTab] = useState('jobs'); // Default selected tab

    return (
        <div className="flex min-h-screen bg-gray-700">
            {/* Vertical Navbar */}
            <nav className="w-64 flex-shrink-0 bg-gray-700">
                <div className="h-16 flex items-center justify-center">
                    <img src={CampusConnectLogo} alt="Demo Logo" className="h-8" />
                </div>
                <div className="flex-grow bg-gray-700">
                    <ul className="mt-6 flex flex-col gap-2">
                        <li>
                            <button
                                className={`text-white w-full px-4 py-2 text-left mt-3 ${selectedTab === 'jobs' ? 'bg-orange-600' : 'bg-gray-900 hover:bg-gray-700'
                                    }`}
                                onClick={() => setSelectedTab('jobs')}
                            >
                                Jobs
                            </button>
                        </li>
                        <li>
                            <button
                                className={`text-white w-full px-4 py-2 text-left mt-3 ${selectedTab === 'companies' ? 'bg-orange-600' : 'bg-gray-900 hover:bg-gray-700'
                                    }`}
                                onClick={() => setSelectedTab('companies')}
                            >
                                Companies
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Content area */}
            <div className="flex-grow p-8 bg-gray-100">
                {selectedTab === 'jobs' ? <JobsComponent /> : <CompaniesComponent />}
            </div>
        </div>
    );
};

export default AdminPanel;
