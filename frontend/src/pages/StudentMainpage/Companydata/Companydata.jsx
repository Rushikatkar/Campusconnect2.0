import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import companycss from './Companydata.module.css';

function Companydata() {
    const [companyData, setCompanyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [dataCount, setDataCount] = useState(0);

    useEffect(() => {
        const filteringState = localStorage.getItem('filteringState');
        if (filteringState !== null) {
            setIsFiltering(JSON.parse(filteringState));
        } else {
            setIsFiltering(false);
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
        axios.get('http://localhost:5000/api/companyinfo')
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        setDataCount(filteredCompanies.length); // Update data count based on filtered data
    }, [filteredCompanies]);

    useEffect(() => {
        if (!isFiltering || !userData) {
            setFilteredCompanies(companyData);
        } else {
            const filteredData = companyData.filter(company => {
                if (company.companyInformation.marks > userData.marksofssc) {
                    return false;
                }

                if (company.companyInformation.cgpa > userData.cgpa) {
                    return false;
                }

                if (company.companyInformation.backlogs < userData.degree_backlogs) {
                    return false;
                }

                return true;
            });

            setFilteredCompanies(filteredData);
        }
    }, [isFiltering, userData, companyData]);

    const toggleFiltering = () => {
        const newFilteringState = !isFiltering;
        setIsFiltering(newFilteringState);
        localStorage.setItem('filteringState', JSON.stringify(newFilteringState));
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const searchedCompanies = companyData.filter(company =>
            company.companyInformation.company_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(searchedCompanies);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <p className="text-sm text-gray-600 mr-2">Filter companies according to your criteria:</p>
                    <label className={companycss.switch}>
                        <input className={companycss.cb} type="checkbox" checked={isFiltering} onChange={toggleFiltering} />
                        <span className={companycss.toggle}>
                            <span className={companycss.left}>off</span>
                            <span className={companycss.right}>on</span>
                        </span>
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search by company name"
                        className="border border-gray-500 rounded-md py-2 px-4 mr-2 w-64"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md" >
                        Search
                    </button>
                </div>
                <div className="ml-4">
                    <h6 className="text-lg font-bold text-gray-800">Total Companies: <span className="text-indigo-700">{dataCount}</span></h6>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.length === 0 ? (
                    <p className="text-center text-gray-600">No companies found.</p>
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
                                <Link
                                    to={{
                                        pathname: `/company/${company.companyInformation.company_name}`,
                                        search: `?companyName=${company.companyInformation.company_name}`
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
