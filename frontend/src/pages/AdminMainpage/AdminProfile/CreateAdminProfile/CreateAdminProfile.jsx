import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import AdminNavbar from '../../../../components/Navbar/AdminNavbar';
export default function CreateAdminProfile() {
    const [successMessage, setSuccessMessage] = useState('');

    const getUserId = () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            return decodedToken._id;
        }
        return null;
    };

    const [adminData, setAdminData] = useState({
        adminId: getUserId(),
        admin_name: '',
        email: '',
        contact: '',
        college_name: '',
        experience: '',
        departments: []
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleAddDepartment = () => {
        setAdminData({
            ...adminData,
            departments: [
                ...adminData.departments,
                {
                    department_name: '',
                    students: {
                        First_year: '',
                        Second_year: '',
                        Third_year: '',
                        Final_year: ''
                    }
                }
            ]
        });
    };

    const handleDepartmentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedDepartments = [...adminData.departments];
        updatedDepartments[index][name] = value;
        setAdminData({ ...adminData, departments: updatedDepartments });
    };

    const handleStudentChange = (deptIndex, year, e) => {
        const { value } = e.target;
        const updatedDepartments = [...adminData.departments];
        updatedDepartments[deptIndex].students[year] = value;
        setAdminData({ ...adminData, departments: updatedDepartments });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v1/admins/createadminprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify(adminData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
            setSuccessMessage('Profile created successfully');
            if (!responseData.success && responseData.message === 'Email is already registered') {
                alert(responseData.message); // Show alert for duplicate email
            } else {
                setSuccessMessage('Profile created successfully');
                setAdminData({
                    adminId: getUserId(),
                    admin_name: '',
                    email: '',
                    contact: '',
                    college_name: '',
                    experience: '',
                    departments: []
                }); // Clear the form fields after successful submission
            }// Clear the form fields after successful submission

        } catch (error) {
            console.error('Error:', error);
            // Handle error condition
        }
    };


    return (
        <>
            <div>
                <AdminNavbar />
            </div>
            <div className="max-w-lg mx-auto mt-4">
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> {successMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg
                                className="fill-current h-6 w-6 text-green-500"
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                onClick={() => setSuccessMessage('')}
                            >
                                <title>Close</title>
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/* Admin Profile Fields */}

                    <div className="mb-4">
                        <label htmlFor="admin_name" className="block text-gray-700 text-sm font-bold mb-2">Admin Name:</label>
                        <input type="text" id="admin_name" name="admin_name" value={adminData.admin_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Admin Name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" id="email" name="email" value={adminData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Email" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact:</label>
                        <input type="tel" id="contact" name="contact" value={adminData.contact} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Contact" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="college_name" className="block text-gray-700 text-sm font-bold mb-2">College Name:</label>
                        <input type="text" id="college_name" name="college_name" value={adminData.college_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter College Name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">Experience:</label>
                        <input type="number" id="experience" name="experience" value={adminData.experience} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Experience" />
                    </div>
                    {/* Department Fields */}
                    {adminData.departments.map((department, index) => (
                        <div key={index} className="mb-4">
                            <label htmlFor={`department_name${index}`} className="block text-gray-700 text-sm font-bold mb-2">Department Name:</label>
                            <input type="text" id={`department_name${index}`} name="department_name" value={department.department_name} onChange={(e) => handleDepartmentChange(index, e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Department Name" />
                            {/* Input fields for student counts */}
                            <div className="flex justify-between mt-2">
                                <input type="number" name="First_year" value={department.students.First_year} onChange={(e) => handleStudentChange(index, 'First_year', e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="Enter Freshman Count" />
                                <input type="number" name="Second_year" value={department.students.Second_year} onChange={(e) => handleStudentChange(index, 'Second_year', e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="Enter Sophomore Count" />
                                <input type="number" name="Third_year" value={department.students.Third_year} onChange={(e) => handleStudentChange(index, 'Third_year', e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="Enter Junior Count" />
                                <input type="number" name="Final_year" value={department.students.Final_year} onChange={(e) => handleStudentChange(index, 'Final_year', e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Senior Count" />
                            </div>
                        </div>
                    ))}
                    {/* Add Department Button */}
                    <button type="button" onClick={handleAddDepartment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Department</button>
                    {/* Submit Button */}
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>

            </div>
        </>
    );
}
