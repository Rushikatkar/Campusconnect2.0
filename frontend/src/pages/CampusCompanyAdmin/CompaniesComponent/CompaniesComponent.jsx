import React, { useState } from 'react';

const CompaniesComponent = () => {
    const [isFormOpen, setIsFormOpen] = useState(false); // State for controlling form visibility
    const [formData, setFormData] = useState({
        company_name: '',
        cgpa: '',
        backlogs: '',
        marks: '',
        aboutCompany: {
            title: '',
            description: ''
        },
        recruitmentProcess: {
            title: '',
            steps: []
        },
        eligibleCriterias: {
            title: '',
            criteria: '',
            details: []
        },
        questionsAsked: {
            title: '',
            questions: []
        },
        whereToApply: {
            links: [
                { name: '', url: '' } // Initial subfields for links
            ]
        },
        image: null // Updated to include image field with null initial value
    });

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen); // Toggle form visibility
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLinksChange = (e, index) => {
        const { name, value } = e.target;
        const updatedLinks = [...formData.whereToApply.links];
        updatedLinks[index] = { ...updatedLinks[index], [name]: value };
        setFormData((prevData) => ({
            ...prevData,
            whereToApply: { ...prevData.whereToApply, links: updatedLinks }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: file // Set image field with the selected file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('company_name', formData.company_name);
            formDataToSend.append('cgpa', formData.cgpa);
            formDataToSend.append('backlogs', formData.backlogs);
            formDataToSend.append('marks', formData.marks);
            formDataToSend.append('aboutCompanyTitle', formData.aboutCompany.title);
            formDataToSend.append('aboutCompanyDescription', formData.aboutCompany.description);
            formDataToSend.append('recruitmentProcessTitle', formData.recruitmentProcess.title);
            formData.recruitmentProcess.steps.forEach((step, index) => {
                formDataToSend.append(`recruitmentProcessStep${index}`, step);
            });
            formDataToSend.append('eligibleCriteriasTitle', formData.eligibleCriterias.title);
            formDataToSend.append('eligibleCriteriasCriteria', formData.eligibleCriterias.criteria);
            formData.eligibleCriterias.details.forEach((detail, index) => {
                formDataToSend.append(`eligibleCriteriasDetail${index}`, detail);
            });
            formDataToSend.append('questionsAskedTitle', formData.questionsAsked.title);
            formData.questionsAsked.questions.forEach((question, index) => {
                formDataToSend.append(`questionsAskedQuestion${index}`, question);
            });
            formData.whereToApply.links.forEach((link, index) => {
                formDataToSend.append(`whereToApplyName${index}`, link.name);
                formDataToSend.append(`whereToApplyURL${index}`, link.url);
            });
            formDataToSend.append('image', formData.image); // Append image file to form data

            const response = await fetch('http://localhost:5000/api/v1/campus/addnewcompany', {
                method: 'POST',
                body: formDataToSend
            });
            if (response.ok) {
                console.log('Company added successfully!');
                // Reset form data or any other actions after successful submission
                setFormData({
                    company_name: '',
                    cgpa: '',
                    backlogs: '',
                    marks: '',
                    aboutCompany: {
                        title: '',
                        description: ''
                    },
                    recruitmentProcess: {
                        title: '',
                        steps: []
                    },
                    eligibleCriterias: {
                        title: '',
                        criteria: '',
                        details: []
                    },
                    questionsAsked: {
                        title: '',
                        questions: []
                    },
                    whereToApply: {
                        links: [
                            { name: '', url: '' }
                        ]
                    },
                    image: null
                });
            } else {
                console.error('Failed to add company.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Companies Information</h1>

            {/* Button to toggle form visibility */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={toggleForm}
            >
                Add Company
            </button>

            {/* Form */}
            {isFormOpen && (
                <form onSubmit={handleSubmit}>
                    {/* Input fields for company information */}
                    <div className="mb-4">
                        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">
                            CGPA
                        </label>
                        <input
                            type="text"
                            id="cgpa"
                            name="cgpa"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.cgpa}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="backlogs" className="block text-sm font-medium text-gray-700">
                            Backlogs
                        </label>
                        <input
                            type="text"
                            id="backlogs"
                            name="backlogs"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.backlogs}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                            Marks
                        </label>
                        <input
                            type="text"
                            id="marks"
                            name="marks"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.marks}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="aboutCompanyTitle" className="block text-sm font-medium text-gray-700">
                            About Company Title
                        </label>
                        <input
                            type="text"
                            id="aboutCompanyTitle"
                            name="aboutCompany.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.aboutCompany.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="aboutCompanyDescription" className="block text-sm font-medium text-gray-700">
                            About Company Description
                        </label>
                        <textarea
                            id="aboutCompanyDescription"
                            name="aboutCompany.description"
                            rows="3"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.aboutCompany.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Input fields for Recruitment Process */}
                    <div className="mb-4">
                        <label htmlFor="recruitmentProcessTitle" className="block text-sm font-medium text-gray-700">
                            Recruitment Process Title
                        </label>
                        <input
                            type="text"
                            id="recruitmentProcessTitle"
                            name="recruitmentProcess.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.recruitmentProcess.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input fields for Recruitment Process steps */}
                    {formData.recruitmentProcess.steps.map((step, index) => (
                        <div className="mb-4" key={index}>
                            <input
                                type="text"
                                id={`recruitmentProcessStep-${index}`}
                                name={`recruitmentProcess.steps[${index}]`}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={step}
                                onChange={(e) => {
                                    const updatedSteps = [...formData.recruitmentProcess.steps];
                                    updatedSteps[index] = e.target.value;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        recruitmentProcess: {
                                            ...prevData.recruitmentProcess,
                                            steps: updatedSteps
                                        }
                                    }));
                                }}
                                placeholder={`Step ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={(e) => {
                            e.preventDefault();
                            setFormData((prevData) => ({
                                ...prevData,
                                recruitmentProcess: {
                                    ...prevData.recruitmentProcess,
                                    steps: [...prevData.recruitmentProcess.steps, '']
                                }
                            }));
                        }}
                    >
                        Add Recruitment Step
                    </button>

                    {/* Input fields for Eligible Criterias */}
                    <div className="mb-4">
                        <label htmlFor="eligibleCriteriasTitle" className="block text-sm font-medium text-gray-700">
                            Eligible Criterias Title
                        </label>
                        <input
                            type="text"
                            id="eligibleCriteriasTitle"
                            name="eligibleCriterias.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.eligibleCriterias.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input fields for Eligible Criterias criteria */}
                    <div className="mb-4">
                        <label htmlFor="eligibleCriteriasCriteria" className="block text-sm font-medium text-gray-700">
                            Eligible Criterias Criteria
                        </label>
                        <input
                            type="text"
                            id="eligibleCriteriasCriteria"
                            name="eligibleCriterias.criteria"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.eligibleCriterias.criteria}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input fields for Eligible Criterias details */}
                    {formData.eligibleCriterias.details.map((detail, index) => (
                        <div className="mb-4" key={index}>
                            <input
                                type="text"
                                id={`eligibleCriteriasDetail-${index}`}
                                name={`eligibleCriterias.details[${index}]`}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={detail}
                                onChange={(e) => {
                                    const updatedDetails = [...formData.eligibleCriterias.details];
                                    updatedDetails[index] = e.target.value;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        eligibleCriterias: {
                                            ...prevData.eligibleCriterias,
                                            details: updatedDetails
                                        }
                                    }));
                                }}
                                placeholder={`Detail ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={(e) => {
                            e.preventDefault();
                            setFormData((prevData) => ({
                                ...prevData,
                                eligibleCriterias: {
                                    ...prevData.eligibleCriterias,
                                    details: [...prevData.eligibleCriterias.details, '']
                                }
                            }));
                        }}
                    >
                        Add Eligible Criteria Detail
                    </button>

                    {/* Input fields for Questions Asked */}
                    <div className="mb-4">
                        <label htmlFor="questionsAskedTitle" className="block text-sm font-medium text-gray-700">
                            Questions Asked Title
                        </label>
                        <input
                            type="text"
                            id="questionsAskedTitle"
                            name="questionsAsked.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.questionsAsked.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input fields for Questions Asked questions */}
                    {formData.questionsAsked.questions.map((question, index) => (
                        <div className="mb-4" key={index}>
                            <input
                                type="text"
                                id={`questionsAskedQuestion-${index}`}
                                name={`questionsAsked.questions[${index}]`}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={question}
                                onChange={(e) => {
                                    const updatedQuestions = [...formData.questionsAsked.questions];
                                    updatedQuestions[index] = e.target.value;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        questionsAsked: {
                                            ...prevData.questionsAsked,
                                            questions: updatedQuestions
                                        }
                                    }));
                                }}
                                placeholder={`Question ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={(e) => {
                            e.preventDefault();
                            setFormData((prevData) => ({
                                ...prevData,
                                questionsAsked: {
                                    ...prevData.questionsAsked,
                                    questions: [...prevData.questionsAsked.questions, '']
                                }
                            }));
                        }}
                    >
                        Add Question
                    </button>


                    {/* Input fields for Where to Apply */}
                    <div className="mb-4">
                        <label htmlFor="whereToApplyTitle" className="block text-sm font-medium text-gray-700">
                            Where to Apply Links
                        </label>
                        {formData.whereToApply.links.map((link, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    id={`whereToApplyName-${index}`}
                                    name={`whereToApply.links[${index}].name`}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={link.name}
                                    onChange={(e) => handleLinksChange(e, index)}
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    id={`whereToApplyURL-${index}`}
                                    name={`whereToApply.links[${index}].url`}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={link.url}
                                    onChange={(e) => handleLinksChange(e, index)}
                                    placeholder="URL"
                                />
                            </div>
                        ))}
                        <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={(e) => {
                                e.preventDefault();
                                setFormData((prevData) => ({
                                    ...prevData,
                                    whereToApply: {
                                        ...prevData.whereToApply,
                                        links: [
                                            ...prevData.whereToApply.links,
                                            { name: '', url: '' }
                                        ]
                                    }
                                }));
                            }}
                        >
                            Add Link
                        </button>
                    </div>
                    <div className="mb-4">

                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="mt-1 block"
                            onChange={handleImageChange}
                        />
                    </div>
                    {/* Add more input fields for other company data */}
                    {/* ... */}

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CompaniesComponent;
