import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CompanyDetail() {
    const [companyInfo, setCompanyInfo] = useState(null);
    const [error, setError] = useState(null); // Add state for error handling
    const location = useLocation();

    useEffect(() => {
        console.log('location.search:', location.search); // Log the query string
        const searchParams = new URLSearchParams(location.search);
        const companyName = searchParams.get('companyName');
        console.log('companyName:', companyName); // Log the extracted companyName

        if (companyName) {
            // Fetch data for the specific company using the company name from URL params
            axios.get(`http://localhost:5000/api/companyinfo?companyName=${companyName}`)
                .then(response => {
                    console.log('API response:', response.data); // Log the API response
                    // Filter the response data based on company_name
                    const filteredCompany = response.data.find(company => company.companyInformation.company_name === companyName);
                    if (filteredCompany) {
                        setCompanyInfo(filteredCompany);
                    } else {
                        setError({ message: 'Company not found' });
                    }
                })
                .catch(error => {
                    console.error('Error fetching company data:', error);
                    setError(error); // Set error state
                });
        }
    }, [location]);

    console.log('companyInfo:', companyInfo); // Log the companyInfo state
    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

    if (!companyInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-6  w-3/5 mx-auto ">
                <h2 className="text-2xl font-bold mb-4 text-center bg-stone-300">{companyInfo.companyInformation.aboutCompany.title}</h2>
                <p className="text-gray-700">{companyInfo.companyInformation.aboutCompany.description}</p>
                <div class="flex flex-col gap-4 mt-2">
                    <div class="font-bold">
                        Minimum CGPA: <span class="font-normal">{companyInfo.companyInformation.cgpa}</span>
                    </div>
                    <div class="font-bold">
                        Total Backlogs Allowed: <span class="font-normal">{companyInfo.companyInformation.backlogs}</span>
                    </div>
                    <div class="font-bold">
                        Minimum 12th/Doploma Marks: <span class="font-normal">{companyInfo.companyInformation.marks}</span>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 bg-stone-300 text-center">Recruitment Process</h3>
                    <ul className="list-disc list-inside">
                        {companyInfo.companyInformation.recruitmentProcess.steps.map((step, index) => (
                            <li key={index} className="mb-2">{step}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white">
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4 bg-stone-300 text-center">Academic Eligible Criterias</h3>
                        <p className="text-gray-700">{companyInfo.companyInformation.eligibleCriterias.criteria}</p>
                        <ul className="list-disc list-inside">
                            {companyInfo.companyInformation.eligibleCriterias.details.map((details, index) => (
                                <li key={index} className="mb-2">{details}</li>
                            ))}
                        </ul>
                        <p>No details available</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 bg-stone-300 text-center">Questions Asked</h3>
                    <ul className="list-disc list-inside">
                        {companyInfo.companyInformation.questionsAsked.questions.map((question, index) => (
                            <li key={index} className="mb-2">{question}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 bg-stone-300 text-center">Where to Apply</h3>
                    <ul className="list-disc list-inside">
                        {companyInfo.companyInformation.whereToApply.links.map((link, index) => (
                            <li key={index} className="mb-2">
                                <a href={link.url} className="text-blue-600 hover:underline">{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetail;
