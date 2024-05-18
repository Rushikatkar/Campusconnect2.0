import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCompany = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/campus/allcompanyinformation');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching company information:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = (id) => {
        // Implement the update logic here
        console.log(`Update company with ID: ${id}`);
    };

    const handleDelete = async (_id) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/campus/deletecompany', { _id });
            console.log(response.data.message);
            setCompanies(companies.filter(company => company._id !== _id));
        } catch (error) {
            console.error('Error deleting company information:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 border-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companies.map((company) => (
                    <div key={company._id} className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className='p-2'>
                            {company.image && (
                                <img
                                    src={company.image.url}
                                    alt={company.company_name}
                                    className="w-full h-48 object-contain"
                                />
                            )}
                        </div>
                        <div className="border-b border-gray-400"></div>
                        <div className="p-4 bg-blue-50">
                            <h2 className="text-xl font-bold mb-2">{company.company_name}</h2>
                            <p className="text-gray-700"><strong>CGPA:</strong> {company.cgpa}</p>
                            <p className="text-gray-700"><strong>Marks:</strong> {company.marks}</p>
                            <p className="text-gray-700"><strong>Backlogs:</strong> {company.backlogs}</p>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdate(company._id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(company._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCompany;
