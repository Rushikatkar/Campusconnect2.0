import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Collegeinfo() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/company/collegeadmins');
                setAdmins(response.data.admins);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4"> College Admins</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {admins.map(admin => (
                    <div key={admin._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <div className="px-6 py-4">
                            <p className="text-xl font-bold mb-2">College Name: {admin.collegeName}</p>
                            <p className="text-gray-700 text-base mb-2">Name: {admin.fullName}</p>
                            <p className="text-gray-700 text-base mb-2">Email: {admin.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
