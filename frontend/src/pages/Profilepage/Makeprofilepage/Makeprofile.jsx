import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import StudentNavbar from '../../../components/Navbar/StudentNavbar';
import Footer from '../../../components/Footer/Footer';

const UserProfileForm = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    const getUserId = () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            return decodedToken._id;
        }
        return null;
    };

    useEffect(() => {
        const id = getUserId();
        setUserId(id);
    }, []);

    const [formData, setFormData] = useState({
        userId: '',
        studentName: '',
        dateOfBirth: '',
        address: '',
        collegeName: '',
        marksOfSSC: '',
        diplomaCGPA: '',
        diplomaBacklogs: '',
        degreeCGPA: '',
        degreeBacklogs: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const backendVariableNames = {
            studentName: 'student_name',
            dateOfBirth: 'date_of_birth',
            address: 'address',
            collegeName: 'college_name',
            marksOfSSC: 'marksofssc',
            diplomaCGPA: 'diploma_cgpa',
            diplomaBacklogs: 'diploma_backlogs',
            degreeCGPA: 'degree_cgpa',
            degreeBacklogs: 'degree_backlogs',
        };

        if (name === 'image') {
            setFormData({ ...formData, [name]: e.target.files });
        } else {
            setFormData({ ...formData, [name]: value, [backendVariableNames[name]]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObject = { ...formData, userId }; // Include userId in form data
            const formDataToSend = new FormData();

            for (const key in formDataObject) {
                if (key === 'image') {
                    formDataToSend.append('image', formDataObject[key][0]); // Assuming you're only allowing one file to be uploaded
                } else {
                    formDataToSend.append(key, formDataObject[key]);
                }
            }

            const response = await fetch('http://localhost:5000/api/studentprofile', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    // No need to set Content-Type, the browser will do it for you
                    // 'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                navigate('/viewprofile');
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <div>
                <StudentNavbar />
            </div>
            <div className="max-w-md mt-4 mx-auto p-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter student name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter address"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collegeName">
                            College Name
                        </label>
                        <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter college name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marksOfSSC">
                            Marks of SSC
                        </label>
                        <input
                            type="number"
                            id="marksOfSSC"
                            name="marksOfSSC"
                            value={formData.marksOfSSC}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter marks of SSC"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diplomaCGPA">
                            Diploma CGPA
                        </label>
                        <input
                            type="number"
                            id="diplomaCGPA"
                            name="diplomaCGPA"
                            value={formData.diplomaCGPA}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter diploma CGPA"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diplomaBacklogs">
                            Diploma Backlogs
                        </label>
                        <input
                            type="number"
                            id="diplomaBacklogs"
                            name="diplomaBacklogs"
                            value={formData.diplomaBacklogs}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter diploma backlogs"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="degreeCGPA">
                            Degree CGPA
                        </label>
                        <input
                            type="number"
                            id="degreeCGPA"
                            name="degreeCGPA"
                            value={formData.degreeCGPA}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter degree CGPA"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="degreeBacklogs">
                            Degree Backlogs
                        </label>
                        <input
                            type="number"
                            id="degreeBacklogs"
                            name="degreeBacklogs"
                            value={formData.degreeBacklogs}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="Enter degree backlogs"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Profile Image
                        </label>
                        <input type="file" id="image" name="image" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default UserProfileForm;
