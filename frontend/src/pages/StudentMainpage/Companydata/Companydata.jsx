import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Companydata() {
    const [companyData, setCompanyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch data from the new backend API endpoint
        axios.get('http://localhost:5000/api/companyinfo')
            .then(response => {
                // Use response.data directly, no need for response.json()
                setCompanyData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredCompanies = companyData.filter(company =>
        company.companyInformation.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <button className="bg-gray-300 text-blue-600 rounded-full p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 13l4-4m0 0l-4-4m4 4H4"
                        />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.map(company => (
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
                ))}
            </div>
        </div>
    );
}

export default Companydata;
