import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function CompanyNavbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const logout = () => {
        // Remove access token and refresh token from cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        // Redirect to login page or any other desired page after logout
        // For example:
        window.location.href = '/';
    };

    return (
        <nav className="bg-blue-900 p-2">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/company" className="text-white text-2xl font-bold">
                    CampusConnect
                </Link>

                <div className="flex-grow flex justify-center space-x-14">
                    <Link to="/company" className="text-white hover:text-gray-300">
                        View College
                    </Link>
                    <Link to="/createjob" className="text-white hover:text-gray-300">
                        Create Job Opening
                    </Link>
                    <Link to="/createdjobs" className="text-white hover:text-gray-300">
                        Created Jobs
                    </Link>
                    {/* <Link to="#" className="text-white hover:text-gray-300">
                        Jobs
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-300">
                        Give Test
                    </Link> */}
                    {/* <Link to="/makeprofile" className="text-white hover:text-gray-300">
                        Make Profile
                    </Link> */}
                </div>

                <div className="flex items-center space-x-4">
                    {/* Profile dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleProfile}
                            className="relative flex items-center focus:outline-none"
                        >
                            <img
                                className="h-8 w-8 rounded-full cursor-pointer"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                            />
                        </button>

                        {/* Profile dropdown content */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" onClick={toggleProfile}>
                                    View Profile
                                </Link>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" onClick={toggleProfile}>
                                    Edit Profile
                                </Link>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" onClick={toggleProfile}>
                                    create Profile
                                </Link>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={logout}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hamburger menu for small screens */}
                    <div className="md:hidden">
                        <button className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive menu for small screens */}
            <div className="hidden md:hidden">
                <div className="flex flex-col items-center mt-2 space-y-2">
                    <Link to="/company" className="text-white hover:text-gray-300">
                        View College
                    </Link>
                    <Link to="/createjob" className="text-white hover:text-gray-300">
                        Create Job Opening
                    </Link>
                    <Link to="/createdjobs" className="text-white hover:text-gray-300">
                        Created Jobs
                    </Link>
                    {/* <Link to="#" className="text-white hover:text-gray-300">
                        Jobs
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-300">
                        Give Test
                    </Link> */}
                    {/* <Link to="/makeprofile" className="text-white hover:text-gray-300">
                        Make Profile
                    </Link> */}
                    {/* Profile dropdown content for small screens */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleProfile}
                            className="relative flex items-center focus:outline-none"
                        >
                            <img
                                className="h-8 w-8 rounded-full cursor-pointer"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                            />
                        </button>

                        {/* Profile dropdown content */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" onClick={toggleProfile}>
                                    View Profile
                                </Link>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" onClick={toggleProfile}>
                                    Edit Profile
                                </Link>
                                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" onClick={toggleProfile}>
                                    create Profile
                                </Link>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={logout}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default CompanyNavbar;
