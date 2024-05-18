import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JobsComponent from '../JobsComponent/JobsComponent';
import MainComp from '../CompaniesComponent/MainComp';
import CampusConnectLogo from '../../../@/images/CampusConnectLogoFinal.png';
import Cookies from 'js-cookie';

const AdminPanel = () => {
    const [selectedTab, setSelectedTab] = useState('jobs'); // Default selected tab

    const handleLogout = () => {
        // Remove tokens from cookies
        Cookies.remove('token'); // Adjust the key name based on your actual token name
        // Redirect to the login page or perform any other logout related tasks
        window.location.href = '/campuslogin'; // Adjust the path based on your actual login route
    };

    return (
        <div className="flex min-h-screen bg-gray-700">
            {/* Vertical Navbar */}
            <nav className="w-64 flex-shrink-0 bg-gray-700">
                <div className="h-16 flex items-center justify-center">
                    <Link to="/admindashboard" rel="noopener noreferrer"><img src={CampusConnectLogo} alt="Demo Logo" className="h-8" /></Link>
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
            <div className="flex-grow p-8 bg-gray-100 relative">
                <button
                    className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                {selectedTab === 'jobs' ? <JobsComponent /> : <MainComp />}
            </div>
        </div>
    );
};

export default AdminPanel;
