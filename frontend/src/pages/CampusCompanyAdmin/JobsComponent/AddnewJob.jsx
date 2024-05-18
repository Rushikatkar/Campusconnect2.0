import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewJob() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        type: 'Full Time',
        url: '',
        company: '',
        company_url: '',
        location: '',
        title: '',
        description: '',
        how_to_apply: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRadioChange = (e) => {
        setFormData({ ...formData, type: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/campus/addnewjob', formData);
            console.log('Job added:', response.data);

            // Fetch all student emails
            const emailResponse = await axios.get('http://localhost:5000/api/v1/campus/fetchallstudentemails');
            const emailList = emailResponse.data.emails.map(emailObj => emailObj.email);

            // Prepare email content
            const emailSubject = 'New Job Opening: ' + formData.title;
            const emailContent = `
                <p>Dear Student,</p>
                <p>We are excited to announce a new job opening at ${formData.company} for the position of ${formData.title}.</p>
                <p><strong>Job Type:</strong> ${formData.type}</p>
                <p><strong>Location:</strong> ${formData.location}</p>
                <p><strong>Description:</strong> ${formData.description}</p>
                <p><strong>How to Apply:</strong> ${formData.how_to_apply}</p>
                <p>For more details, visit: <a href="${formData.url}">${formData.url}</a></p>
                <p>Best regards,<br/>Campus Recruitment Team</p>
            `;

            // Send email to each user
            for (const email of emailList) {
                await axios.post('http://localhost:5000/api/email/send-email', {
                    toEmail: email,
                    subject: emailSubject,
                    htmlContent: emailContent
                });
            }

            // Reset form data and hide form
            setFormData({
                id: '',
                type: 'Full Time',
                url: '',
                company: '',
                company_url: '',
                location: '',
                title: '',
                description: '',
                how_to_apply: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error adding job or sending emails:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add New Job'}
            </button>

            {showForm && (
                <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Job ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Job Type</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Full Time"
                                    checked={formData.type === 'Full Time'}
                                    onChange={handleRadioChange}
                                    className="mr-2"
                                />
                                Full Time
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Part Time"
                                    checked={formData.type === 'Part Time'}
                                    onChange={handleRadioChange}
                                    className="mr-2"
                                />
                                Part Time
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Internship"
                                    checked={formData.type === 'Internship'}
                                    onChange={handleRadioChange}
                                    className="mr-2"
                                />
                                Internship
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Job URL</label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Company URL</label>
                        <input
                            type="text"
                            name="company_url"
                            value={formData.company_url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Job Role Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">How to Apply</label>
                        <textarea
                            name="how_to_apply"
                            value={formData.how_to_apply}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
