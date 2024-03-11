import React, { useState } from 'react';
import axios from 'axios';
import CompanyNavbar from '../../../components/Navbar/Companynavbar';
import Footer from '../../../components/Footer/Footer';

const departmentsList = [
    'Computer Science Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics and Communication Engineering',
    // Add more departments as needed
];

export default function Jobsection() {
    const [formData, setFormData] = useState({
        type: '',
        jobURL: '', // Corrected field name
        company: '',
        company_url: '',
        location: '',
        title: '',
        description: '',
        how_to_apply: '',
        company_logo: '',
        college_name: '',
        department: [],
        hscmarks: '',
        cgpa: '',
        backlogs: ''
    });

    const [selectedDepartments, setSelectedDepartments] = useState([]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleDepartmentChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value).filter(option => option.trim() !== '');
        setSelectedDepartments(selectedOptions);
    };

    const handleAddDepartment = () => {
        const nonEmptyDepartments = selectedDepartments.filter(dep => dep.trim() !== '');
        setFormData({ ...formData, department: [...formData.department, ...nonEmptyDepartments] });
    };

    const handleRemoveDepartment = (department) => {
        setFormData({ ...formData, department: formData.department.filter(dep => dep !== department) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/v1/company/createjob', formData);
            alert('Job information created successfully');
            setFormData({
                type: '',
                jobURL: '', // Corrected field name
                company: '',
                company_url: '',
                location: '',
                title: '',
                description: '',
                how_to_apply: '',
                company_logo: '',
                college_name: '',
                department: [],
                hscmarks: '',
                cgpa: '',
                backlogs: ''
            });
            setSelectedDepartments([]);
        } catch (error) {
            console.error('Error creating job information:', error);
            alert('Failed to create job information');
        }
    };


    return (
        <>
            <div>
                <CompanyNavbar />
            </div>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Add Job Information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type(Full Time / Part Time)</label>
                            <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="jobURL" className="block text-sm font-medium text-gray-700">Job URL</label>
                            <input type="text" name="jobURL" id="jobURL" value={formData.jobURL} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                            <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="company_url" className="block text-sm font-medium text-gray-700">Company URL</label>
                            <input type="text" name="company_url" id="company_url" value={formData.company_url} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" rows="4"></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="how_to_apply" className="block text-sm font-medium text-gray-700">How to Apply</label>
                            <textarea name="how_to_apply" id="how_to_apply" value={formData.how_to_apply} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" rows="4"></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="company_logo" className="block text-sm font-medium text-gray-700">Company Logo</label>
                            <input type="text" name="company_logo" id="company_logo" value={formData.company_logo} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        <div className="col-span-2 mb-4">
                            <label htmlFor="collegename" className="block text-sm font-medium text-gray-700">College Name</label>
                            <input type="text" name="college_name" id="college_name" value={formData.college_name} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        {/* Department dropdown */}
                        <div className="mb-4">
                            <label htmlFor="departments" className="block text-sm font-medium text-gray-700">Departments</label>
                            <div className="relative">
                                <select name="departments" id="departments" value={selectedDepartments} onChange={handleDepartmentChange} className="mt-1 p-2 block w-full border rounded-md appearance-none">
                                    <option value="">Select Department</option>
                                    {departmentsList.map(department => (
                                        <option key={department} value={department}>{department}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M11.953 10l5.526-5.526a1 1 0 0 0-1.414-1.414L10.54 8.586 5.014 3.06a1 1 0 0 0-1.414 1.414L9.126 10l-5.526 5.526a1 1 0 0 0 1.414 1.414L10.54 11.414l5.526 5.526a1 1 0 1 0 1.414-1.414L11.953 10z" /></svg>
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={handleAddDepartment} className="bg-blue-500 text-white py-2 px-5 rounded-md self-start mt-6">Add</button>
                        {/* Display selected departments */}
                        <div>
                            {formData.department.map((department, index) => (
                                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {department}
                                    <button type="button" onClick={() => handleRemoveDepartment(department)} className="ml-2 p-1 text-xs text-red-600">&times;</button>
                                </span>
                            ))}
                        </div>
                        {/* Additional form fields */}
                        {/* HSC Marks */}
                        <div className="mb-4">
                            <label htmlFor="hscmarks" className="block text-sm font-medium text-gray-700">HSC Marks</label>
                            <input type="text" name="hscmarks" id="hscmarks" value={formData.hscmarks} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        {/* CGPA */}
                        <div className="mb-4">
                            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">CGPA</label>
                            <input type="text" name="cgpa" id="cgpa" value={formData.cgpa} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        {/* Backlogs */}
                        <div className="mb-4">
                            <label htmlFor="backlogs" className="block text-sm font-medium text-gray-700">Backlogs</label>
                            <input type="text" name="backlogs" id="backlogs" value={formData.backlogs} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                        </div>
                        {/* Submit button */}
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}
