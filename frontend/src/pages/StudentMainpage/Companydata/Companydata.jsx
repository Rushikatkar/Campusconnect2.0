import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function Companydata() {
    const [companyData, setCompanyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false); // State to control filtering
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    useEffect(() => {
        // Retrieve filtering state from local storage
        const filteringState = localStorage.getItem('filteringState');
        if (filteringState !== null) {
            setIsFiltering(JSON.parse(filteringState));
        } else {
            setIsFiltering(false); // Set default filtering state
        }

        const getUserIdFromToken = () => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                return decodedToken._id;
            }
            return null;
        };

        const userId = getUserIdFromToken();
        if (userId) {
            setIsLoading(true);
            axios.get(`http://localhost:5000/api/profile?userId=${userId}`)
                .then(response => {
                    const userProfile = response.data.userProfile;
                    setUserData(userProfile);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    useEffect(() => {
        // Fetch data from the new backend API endpoint
        axios.get('http://localhost:5000/api/companyinfo')
            .then(response => {
                // Use response.data directly, no need for response.json()
                setCompanyData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        console.log("Filtering State:", isFiltering);
        console.log("User Data:", userData);
        console.log("Company Data:", companyData);

        if (!isFiltering || !userData) {
            // If filtering is off or user data is not available, set filtered companies to all companies
            console.log("No Filtering Applied");
            setFilteredCompanies(companyData);
        } else {
            // Apply filtering criteria and update filtered companies accordingly
            console.log("Applying Filtering Criteria");

            const filteredData = companyData.filter(company => {
                if (company.companyInformation.marks > userData.marksofssc) {
                    return false; // Skip if marks are greater than user's marks
                }

                if (company.companyInformation.cgpa > userData.cgpa) {
                    return false; // Skip if CGPA is greater than user's CGPA
                }

                if (company.companyInformation.backlogs < userData.degree_backlogs) {
                    return false; // Skip if backlogs are less than user's degree backlogs
                }

                // If all conditions pass, include the company in filtered data
                return true;
            });

            console.log("Filtered Data:", filteredData);
            setFilteredCompanies(filteredData);
        }
    }, [isFiltering, userData, companyData]);

    const toggleFiltering = () => {
        const newFilteringState = !isFiltering;
        setIsFiltering(newFilteringState); // Update the filtering state

        // Store the filtering state in local storage
        localStorage.setItem('filteringState', JSON.stringify(newFilteringState));
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by company name"
                    className="border border-gray-500 rounded-md py-2 px-4 mr-2 w-64"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="bg-gray-300 text-blue-600 rounded-full p-2" onClick={toggleFiltering}>
                    {isFiltering ? 'Turn Off Filtering' : 'Turn On Filtering'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.length === 0 ? (
                    <p className="text-center text-gray-600">You are not eligible for any of these companies.</p>
                ) : (
                    filteredCompanies.map(company => (
                        <div key={company._id} className="bg-white p-4 rounded-lg border border-gray-300 shadow-md flex flex-col justify-between">
                            <div>
                                <img
                                    src={`https://source.unsplash.com/300x200/?${company.companyInformation.company_name}`}
                                    alt={company.companyInformation.company_name}
                                    className="w-full h-40 object-cover mb-4 rounded-lg shadow-md"
                                />
                                <div className="mb-2 border-b-2 border-gray-200"></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 bg-gray-100 p-2 rounded-lg text-center">{company.companyInformation.company_name}</h3>
                            <div>
                                <p className="text-gray-600 mb-2">Marks: {company.companyInformation.marks}</p>
                                <p className="text-gray-600 mb-2">CGPA: {company.companyInformation.cgpa}</p>
                                <p className="text-gray-600 mb-4">Backlogs: {company.companyInformation.backlogs}</p>
                                {/* Use Link to navigate to a new page with the company information */}
                                <Link
                                    to={{
                                        pathname: `/company/${company.companyInformation.company_name}`,
                                        search: `?companyName=${company.companyInformation.company_name}` // Pass the companyName as query parameter
                                    }}
                                    className="w-full text-white bg-indigo-700 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg md:text-base flex items-center justify-center"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Companydata;
