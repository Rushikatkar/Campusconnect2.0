// import React, { useState } from 'react';

// const CompaniesComponent = () => {
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         company_name: '',
//         cgpa: '',
//         backlogs: '',
//         marks: '',
//         aboutCompany: {
//             title: '',
//             description: ''
//         },
//         recruitmentProcess: {
//             title: '',
//             steps: []
//         },
//         eligibleCriterias: {
//             title: '',
//             criteria: '',
//             details: []
//         },
//         questionsAsked: {
//             title: '',
//             questions: []
//         },
//         whereToApply: {
//             links: [{ name: '', url: '' }]
//         },
//         image: null
//     });

//     const toggleForm = () => {
//         setIsFormOpen(!isFormOpen);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name.includes('.')) {
//             const [parentName, childName] = name.split('.');
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [parentName]: { ...prevData[parentName], [childName]: value }
//             }));
//         } else {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [name]: value
//             }));
//         }
//     };

//     const handleArrayChange = (parentName, index, value) => {
//         setFormData((prevData) => {
//             const updatedArray = [...prevData[parentName].steps];
//             updatedArray[index] = value;
//             return {
//                 ...prevData,
//                 [parentName]: {
//                     ...prevData[parentName],
//                     steps: updatedArray
//                 }
//             };
//         });
//     };

//     const handleDetailsChange = (parentName, index, value) => {
//         setFormData((prevData) => {
//             const updatedArray = [...prevData[parentName].details];
//             updatedArray[index] = value;
//             return {
//                 ...prevData,
//                 [parentName]: {
//                     ...prevData[parentName],
//                     details: updatedArray
//                 }
//             };
//         });
//     };

//     const handleQuestionsChange = (parentName, index, value) => {
//         setFormData((prevData) => {
//             const updatedArray = [...prevData[parentName].questions];
//             updatedArray[index] = value;
//             return {
//                 ...prevData,
//                 [parentName]: {
//                     ...prevData[parentName],
//                     questions: updatedArray
//                 }
//             };
//         });
//     };

//     const handleLinksChange = (index, field, value) => {
//         const updatedLinks = formData.whereToApply.links.map((link, i) => {
//             if (i === index) {
//                 return { ...link, [field]: value };
//             }
//             return link;
//         });
//         setFormData((prevData) => ({
//             ...prevData,
//             whereToApply: { ...prevData.whereToApply, links: updatedLinks }
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 image: reader.result
//             }));
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/api/v1/campus/addnewcompany', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 console.log('Company added successfully!');
//                 setFormData({
//                     company_name: '',
//                     cgpa: '',
//                     backlogs: '',
//                     marks: '',
//                     aboutCompany: {
//                         title: '',
//                         description: ''
//                     },
//                     recruitmentProcess: {
//                         title: '',
//                         steps: []
//                     },
//                     eligibleCriterias: {
//                         title: '',
//                         criteria: '',
//                         details: []
//                     },
//                     questionsAsked: {
//                         title: '',
//                         questions: []
//                     },
//                     whereToApply: {
//                         links: [{ name: '', url: '' }]
//                     },
//                     image: null
//                 });
//             } else {
//                 console.error('Failed to add company.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-4">Companies Information</h1>

//             <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
//                 onClick={toggleForm}
//             >
//                 Add Company
//             </button>

//             {isFormOpen && (
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
//                             Company Name
//                         </label>
//                         <input
//                             type="text"
//                             id="company_name"
//                             name="company_name"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.company_name}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">
//                             CGPA
//                         </label>
//                         <input
//                             type="text"
//                             id="cgpa"
//                             name="cgpa"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.cgpa}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="backlogs" className="block text-sm font-medium text-gray-700">
//                             Backlogs
//                         </label>
//                         <input
//                             type="text"
//                             id="backlogs"
//                             name="backlogs"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.backlogs}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
//                             Marks
//                         </label>
//                         <input
//                             type="text"
//                             id="marks"
//                             name="marks"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.marks}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="aboutCompanyTitle" className="block text-sm font-medium text-gray-700">
//                             About Company Title
//                         </label>
//                         <input
//                             type="text"
//                             id="aboutCompanyTitle"
//                             name="aboutCompany.title"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.aboutCompany.title}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="aboutCompanyDescription" className="block text-sm font-medium text-gray-700">
//                             About Company Description
//                         </label>
//                         <textarea
//                             id="aboutCompanyDescription"
//                             name="aboutCompany.description"
//                             rows="3"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.aboutCompany.description}
//                             onChange={handleChange}
//                         ></textarea>
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="recruitmentProcessTitle" className="block text-sm font-medium text-gray-700">
//                             Recruitment Process Title
//                         </label>
//                         <input
//                             type="text"
//                             id="recruitmentProcessTitle"
//                             name="recruitmentProcess.title"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.recruitmentProcess.title}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Recruitment Process Steps
//                         </label>
//                         {formData.recruitmentProcess.steps.map((step, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 name={`recruitmentProcess.steps[${index}]`}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 value={step}
//                                 onChange={(e) => handleArrayChange('recruitmentProcess', index, e.target.value)}
//                             />
//                         ))}
//                         <button
//                             type="button"
//                             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
//                             onClick={() =>
//                                 setFormData((prevData) => ({
//                                     ...prevData,
//                                     recruitmentProcess: {
//                                         ...prevData.recruitmentProcess,
//                                         steps: [...prevData.recruitmentProcess.steps, '']
//                                     }
//                                 }))
//                             }
//                         >
//                             Add Step
//                         </button>
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="eligibleCriteriasTitle" className="block text-sm font-medium text-gray-700">
//                             Eligible Criteria Title
//                         </label>
//                         <input
//                             type="text"
//                             id="eligibleCriteriasTitle"
//                             name="eligibleCriterias.title"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.eligibleCriterias.title}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="eligibleCriteriasCriteria" className="block text-sm font-medium text-gray-700">
//                             Eligible Criteria
//                         </label>
//                         <input
//                             type="text"
//                             id="eligibleCriteriasCriteria"
//                             name="eligibleCriterias.criteria"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.eligibleCriterias.criteria}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Eligible Criteria Details
//                         </label>
//                         {formData.eligibleCriterias.details.map((detail, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 name={`eligibleCriterias.details[${index}]`}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 value={detail}
//                                 onChange={(e) => handleDetailsChange('eligibleCriterias', index, e.target.value)}
//                             />
//                         ))}
//                         <button
//                             type="button"
//                             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
//                             onClick={() =>
//                                 setFormData((prevData) => ({
//                                     ...prevData,
//                                     eligibleCriterias: {
//                                         ...prevData.eligibleCriterias,
//                                         details: [...prevData.eligibleCriterias.details, '']
//                                     }
//                                 }))
//                             }
//                         >
//                             Add Detail
//                         </button>
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="questionsAskedTitle" className="block text-sm font-medium text-gray-700">
//                             Questions Asked Title
//                         </label>
//                         <input
//                             type="text"
//                             id="questionsAskedTitle"
//                             name="questionsAsked.title"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             value={formData.questionsAsked.title}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Questions Asked
//                         </label>
//                         {formData.questionsAsked.questions.map((question, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 name={`questionsAsked.questions[${index}]`}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 value={question}
//                                 onChange={(e) => handleQuestionsChange('questionsAsked', index, e.target.value)}
//                             />
//                         ))}
//                         <button
//                             type="button"
//                             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
//                             onClick={() =>
//                                 setFormData((prevData) => ({
//                                     ...prevData,
//                                     questionsAsked: {
//                                         ...prevData.questionsAsked,
//                                         questions: [...prevData.questionsAsked.questions, '']
//                                     }
//                                 }))
//                             }
//                         >
//                             Add Question
//                         </button>
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Where to Apply Links
//                         </label>
//                         {formData.whereToApply.links.map((link, index) => (
//                             <div key={index} className="mb-2">
//                                 <input
//                                     type="text"
//                                     name={`whereToApply.links[${index}].name`}
//                                     placeholder="Link Name"
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                     value={link.name}
//                                     onChange={(e) => handleLinksChange(index, 'name', e.target.value)}
//                                 />
//                                 <input
//                                     type="text"
//                                     name={`whereToApply.links[${index}].url`}
//                                     placeholder="Link URL"
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                     value={link.url}
//                                     onChange={(e) => handleLinksChange(index, 'url', e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                         <button
//                             type="button"
//                             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
//                             onClick={() =>
//                                 setFormData((prevData) => ({
//                                     ...prevData,
//                                     whereToApply: {
//                                         ...prevData.whereToApply,
//                                         links: [...prevData.whereToApply.links, { name: '', url: '' }]
//                                     }
//                                 }))
//                             }
//                         >
//                             Add Link
//                         </button>
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//                             Company Logo
//                         </label>
//                         <input
//                             type="file"
//                             id="image"
//                             name="image"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                             onChange={handleImageChange}
//                         />
//                         {formData.image && (
//                             <img src={formData.image} alt="Company Logo" className="mt-2 h-20" />
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default CompaniesComponent;


import React, { useState } from 'react';

const CompaniesComponent = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
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
            links: [{ name: '', url: '' }]
        },
        tags: [],
        avatar: null
    });

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parentName, childName] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [parentName]: { ...prevData[parentName], [childName]: value }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleArrayChange = (parentName, index, value) => {
        setFormData((prevData) => {
            const updatedArray = [...prevData[parentName].steps];
            updatedArray[index] = value;
            return {
                ...prevData,
                [parentName]: {
                    ...prevData[parentName],
                    steps: updatedArray
                }
            };
        });
    };

    const handleDetailsChange = (parentName, index, value) => {
        setFormData((prevData) => {
            const updatedArray = [...prevData[parentName].details];
            updatedArray[index] = value;
            return {
                ...prevData,
                [parentName]: {
                    ...prevData[parentName],
                    details: updatedArray
                }
            };
        });
    };

    const handleQuestionsChange = (parentName, index, value) => {
        setFormData((prevData) => {
            const updatedArray = [...prevData[parentName].questions];
            updatedArray[index] = value;
            return {
                ...prevData,
                [parentName]: {
                    ...prevData[parentName],
                    questions: updatedArray
                }
            };
        });
    };

    const handleLinksChange = (index, field, value) => {
        const updatedLinks = formData.whereToApply.links.map((link, i) => {
            if (i === index) {
                return { ...link, [field]: value };
            }
            return link;
        });
        setFormData((prevData) => ({
            ...prevData,
            whereToApply: { ...prevData.whereToApply, links: updatedLinks }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            avatar: file
        }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        formPayload.append('company_name', formData.company_name);
        formPayload.append('cgpa', formData.cgpa);
        formPayload.append('backlogs', formData.backlogs);
        formPayload.append('marks', formData.marks);
        formPayload.append('aboutCompany[title]', formData.aboutCompany.title);
        formPayload.append('aboutCompany[description]', formData.aboutCompany.description);
        formPayload.append('recruitmentProcess[title]', formData.recruitmentProcess.title);
        formData.recruitmentProcess.steps.forEach((step, index) => {
            formPayload.append(`recruitmentProcess[steps][${index}]`, step);
        });
        formPayload.append('eligibleCriterias[title]', formData.eligibleCriterias.title);
        formPayload.append('eligibleCriterias[criteria]', formData.eligibleCriterias.criteria);
        formData.eligibleCriterias.details.forEach((detail, index) => {
            formPayload.append(`eligibleCriterias[details][${index}]`, detail);
        });
        formPayload.append('questionsAsked[title]', formData.questionsAsked.title);
        formData.questionsAsked.questions.forEach((question, index) => {
            formPayload.append(`questionsAsked[questions][${index}]`, question);
        });
        formData.whereToApply.links.forEach((link, index) => {
            formPayload.append(`whereToApply[links][${index}][name]`, link.name);
            formPayload.append(`whereToApply[links][${index}][url]`, link.url);
        });
        if (formData.avatar) {
            formPayload.append('avatar', formData.avatar);
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/campus/addnewcompany', {
                method: 'POST',
                body: formPayload
            });

            if (response.ok) {
                console.log('Company added successfully!');
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
                        links: [{ name: '', url: '' }]
                    },
                    avatar: null
                });

                // Fetch all student emails
                const emailResponse = await fetch('http://localhost:5000/api/v1/campus/fetchallstudentemails');
                if (emailResponse.ok) {
                    const emailData = await emailResponse.json();
                    const emails = emailData.emails.map(emailObj => emailObj.email);

                    // Send email to each student
                    const emailPromises = emails.map(email => {
                        return fetch('http://localhost:5000/api/email/send-email', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                toEmail: email,
                                subject: 'New Company Added',
                                htmlContent: `
                                    <h1>New Company Added</h1>
                                    <p>Company Name: ${formData.company_name}</p>
                                    <p>About Company: ${formData.aboutCompany.description}</p>
                                    <p>CGPA Required: ${formData.cgpa}</p>
                                    <p>Backlogs Allowed: ${formData.backlogs}</p>
                                    <p>Marks Required: ${formData.marks}</p>
                                    <p>Recruitment Process: ${formData.recruitmentProcess.steps.join(', ')}</p>
                                    <p>Eligible Criteria: ${formData.eligibleCriterias.criteria}</p>
                                    <p>Questions Asked: ${formData.questionsAsked.questions.join(', ')}</p>
                                    <p>Where to Apply: ${formData.whereToApply.links.map(link => `<a href="${link.url}">${link.name}</a>`).join(', ')}</p>
                                `
                            })
                        });
                    });

                    await Promise.all(emailPromises);
                    console.log('Emails sent successfully!');
                } else {
                    console.error('Failed to fetch student emails.');
                }
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

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={toggleForm}
            >
                Add New Company
            </button>

            {isFormOpen && (
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="aboutCompany.title" className="block text-sm font-medium text-gray-700">
                            About Company Title
                        </label>
                        <input
                            type="text"
                            id="aboutCompany.title"
                            name="aboutCompany.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.aboutCompany.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="aboutCompany.description" className="block text-sm font-medium text-gray-700">
                            About Company Description
                        </label>
                        <textarea
                            id="aboutCompany.description"
                            name="aboutCompany.description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.aboutCompany.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="recruitmentProcess.title" className="block text-sm font-medium text-gray-700">
                            Recruitment Process Title
                        </label>
                        <input
                            type="text"
                            id="recruitmentProcess.title"
                            name="recruitmentProcess.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.recruitmentProcess.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="recruitmentProcess.steps" className="block text-sm font-medium text-gray-700">
                            Recruitment Process Steps
                        </label>
                        {formData.recruitmentProcess.steps.map((step, index) => (
                            <input
                                key={index}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                                value={step}
                                onChange={(e) => handleArrayChange('recruitmentProcess', index, e.target.value)}
                            />
                        ))}
                        <button
                            type="button"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                            onClick={() => setFormData((prevData) => ({
                                ...prevData,
                                recruitmentProcess: {
                                    ...prevData.recruitmentProcess,
                                    steps: [...prevData.recruitmentProcess.steps, '']
                                }
                            }))}
                        >
                            Add Step
                        </button>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="eligibleCriterias.title" className="block text-sm font-medium text-gray-700">
                            Eligible Criterias Title
                        </label>
                        <input
                            type="text"
                            id="eligibleCriterias.title"
                            name="eligibleCriterias.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.eligibleCriterias.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="eligibleCriterias.criteria" className="block text-sm font-medium text-gray-700">
                            Eligible Criterias Criteria
                        </label>
                        <input
                            type="text"
                            id="eligibleCriterias.criteria"
                            name="eligibleCriterias.criteria"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.eligibleCriterias.criteria}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="eligibleCriterias.details" className="block text-sm font-medium text-gray-700">
                            Eligible Criterias Details
                        </label>
                        {formData.eligibleCriterias.details.map((detail, index) => (
                            <input
                                key={index}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                                value={detail}
                                onChange={(e) => handleDetailsChange('eligibleCriterias', index, e.target.value)}
                            />
                        ))}
                        <button
                            type="button"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                            onClick={() => setFormData((prevData) => ({
                                ...prevData,
                                eligibleCriterias: {
                                    ...prevData.eligibleCriterias,
                                    details: [...prevData.eligibleCriterias.details, '']
                                }
                            }))}
                        >
                            Add Detail
                        </button>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="questionsAsked.title" className="block text-sm font-medium text-gray-700">
                            Questions Asked Title
                        </label>
                        <input
                            type="text"
                            id="questionsAsked.title"
                            name="questionsAsked.title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.questionsAsked.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="questionsAsked.questions" className="block text-sm font-medium text-gray-700">
                            Questions Asked
                        </label>
                        {formData.questionsAsked.questions.map((question, index) => (
                            <input
                                key={index}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                                value={question}
                                onChange={(e) => handleQuestionsChange('questionsAsked', index, e.target.value)}
                            />
                        ))}
                        <button
                            type="button"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                            onClick={() => setFormData((prevData) => ({
                                ...prevData,
                                questionsAsked: {
                                    ...prevData.questionsAsked,
                                    questions: [...prevData.questionsAsked.questions, '']
                                }
                            }))}
                        >
                            Add Question
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Where to Apply Links
                        </label>
                        {formData.whereToApply.links.map((link, index) => (
                            <div key={index} className="mt-1 flex">
                                <input
                                    type="text"
                                    className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
                                    placeholder="Link Name"
                                    value={link.name}
                                    onChange={(e) => handleLinksChange(index, 'name', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={(e) => handleLinksChange(index, 'url', e.target.value)}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                            onClick={() =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    whereToApply: {
                                        ...prevData.whereToApply,
                                        links: [...prevData.whereToApply.links, { name: '', url: '' }]
                                    }
                                }))
                            }
                        >
                            Add Link
                        </button>
                    </div>



                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Avatar
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )
            }
        </div >
    );
};

export default CompaniesComponent;
