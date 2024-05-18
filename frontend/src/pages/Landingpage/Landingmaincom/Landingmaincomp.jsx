import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import landingimg from '../../../@/images/landingimg.png';
import Landingcss from './Landingmaincomp.module.css';
import Landingimg2 from '../../../@/images/landingimg2.png'
import Landingimg3 from '../../../@/images/landingimg3.png';
import companyimg from '../../../@/images/companyimg.jpg';
import CampusConnectLogo from '../../../@/images/CampusConnectLogoFinal.png';
function Landingmaincomp() {
    const [marks, setMarks] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [backlogs, setBacklogs] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const name = 'Check Now';

    const sendDataToApi = () => {
        // Make a POST request to your API endpoint
        axios.post('http://localhost:5000/api/student', {
            marks: parseInt(marks),
            cgpa: parseFloat(cgpa),
            backlogs: parseInt(backlogs),
        })
            .then((response) => {
                // Handle the response as needed
                // console.log(response.data);
                setResponseData(response.data);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error sending data to API', error);
            });
    };

    const handleSearchResult = (result) => {
        // Do something with the result, e.g., update state
        setSearchResult(result);
    };
    return (
        <>
            <div className={Landingcss.container}>
                <div className={Landingcss.all}>
                    <div className={Landingcss.navbar}>
                        <nav>
                            <div className={Landingcss.left}>
                                <h2>CampusConnect</h2>
                            </div>
                            <div className="right">
                                <ul>
                                    <li><Link to="#"><b>Home</b></Link></li>
                                    <li><Link to="#"><b>About</b></Link></li>
                                    <li><Link to="/contact"><b>Contact</b></Link></li>
                                </ul>
                            </div>
                        </nav>
                        <div className={Landingcss.headline}>
                            <h1>Analyse Yourself</h1>
                            <h1 style={{ color: '#0C47BD' }}>By Industry Standards</h1>

                            <a href="#maincomp">
                                <button className={Landingcss.bttn}>
                                    <span>Get Started</span>
                                    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                                        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                                    </svg>
                                </button>
                            </a>
                        </div>
                        <div className={Landingcss.headline2}>
                            <div class="flex justify-space">
                                <Link to="/login"><button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">LogIn</button>
                                </Link>
                                <Link to="/signup"><button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Register</button></Link>
                            </div>
                        </div>


                    </div>
                    <div className={Landingcss.img}>
                        <img src={landingimg} alt="" />
                    </div>
                </div>

            </div >

            <div id="maincomp">
                <div style={{ fontFamily: 'Poppins', fontSize: '2rem', fontWeight: 'bold' }}>
                    <div className="headline text-center p-5 " >
                        <h2>Enter Here Your Details Here To Check Your</h2>
                        <h2 style={{ color: '#0C47BD' }}>Eligible Companies</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="input mx-auto">
                        <div className="w-full md:w-96 md:max-w-full mx-auto shadow-md mt-4">
                            <div className="p-6 border border-gray-300 sm:rounded-md">
                                <form method="POST" action="">
                                    <label className="block mb-4">
                                        <span className="text-gray-700">12th Marks</span>
                                        <input
                                            type="number"
                                            name="marks"
                                            className="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-md
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                                            placeholder="60"
                                            value={marks}
                                            onChange={(e) => setMarks(e.target.value)}
                                        />
                                    </label>
                                    <label className="block mb-4">
                                        <span className="text-gray-700">CGPA</span>
                                        <input
                                            type="number"
                                            name="cgpa"
                                            className="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-md
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                                            placeholder="6"
                                            value={cgpa}
                                            onChange={(e) => setCgpa(e.target.value)}
                                        />
                                    </label>
                                    <label className="block mb-4">
                                        <span className="text-gray-700">Backlogs</span>
                                        <input
                                            type="number"
                                            name="backlogs"
                                            className="
            block
            w-full
            mt-1
            p-2
            border-gray-300
            rounded-md
            shadow-md
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                                            placeholder="0"
                                            value={backlogs}
                                            onChange={(e) => setBacklogs(e.target.value)}
                                        />
                                    </label>
                                    <div className="mb-6">
                                        <button
                                            type="button"
                                            className="
                                w-full
                                h-10
                                px-5
                                text-white
                                bg-indigo-700
                                rounded-lg
                                transition-colors
                                duration-150
                                focus:shadow-outline
                                hover:bg-indigo-800
                            "
                                            onClick={sendDataToApi}
                                        >
                                            Check Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="output mx-auto w-auto border border-solid rounded shadow-md">
                        {searchResult && (
                            <table className="table-auto mx-auto ">
                                <thead>
                                    <tr>
                                        <th className="px-1.5 lg:px-4 py-2">Company Name</th>
                                        <th className="px-1.5 lg:px-4 py-2">CGPA</th>
                                        <th className="px-1.5 lg:px-4 py-2">Backlogs</th>
                                        <th className="px-1.5 lg:px-4 py-2">Marks</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responseData.map((item) => (
                                        <tr key={item.company_name}>
                                            <td className="lg:px-4 py-2">{item.company_name}</td>
                                            <td className="lg:px-4 py-2">{item.cgpa}</td>
                                            <td className="lg:px-4 py-2">{item.backlogs}</td>
                                            <td className="lg:px-4 py-2">{item.marks}</td>
                                            <td>
                                                <button className="flex mx-auto mt-6 text-white bg-indigo-700 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                                                    <a href="#logreg">More</a>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div id="logreg">
                <section class="text-gray-600 body-font">
                    <h1 className="title-font sm:text-4xl text-3xl mt-5 mb-0 font-bold text-gray-900 text-center">For Students Login</h1>
                    <div class="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
                        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                            <img class="object-cover object-center rounded" alt="hero" src={Landingimg2} />
                        </div>
                        <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">To Use This Platform Effectively
                                <br class="hidden lg:inline-block" />Please Login For College <span className='text-red-600'>Students</span>
                            </h1>
                            <p class="mb-8 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quaerat enim, rem natus commodi illum labore vitae exercitationem maxime quis mollitia beatae vel vero molestias nobis officia facere, aliquid ratione ipsum! Sapiente, aut nemo!</p>
                            <div class="flex justify-center">
                                <Link to="/login"><button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">LogIn</button>
                                </Link>
                                <Link to="/signup"><button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Register</button></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div id="logreg">
                <section className="text-gray-600 body-font">
                    <h1 className="title-font sm:text-4xl text-3xl mb-0 font-bold text-gray-900 text-center">For College Admin</h1>
                    <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
                        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                To Use This Platform Effectively
                                <br className="hidden lg:inline-block" />Please Login for <span className='text-red-600'>College Admins</span>
                            </h1>
                            <p className="mb-8 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quaerat enim, rem natus commodi illum labore vitae exercitationem maxime quis mollitia beatae vel vero molestias nobis officia facere, aliquid ratione ipsum! Sapiente, aut nemo!
                            </p>
                            <div className="flex justify-center">
                                <Link to="/adminlogin">
                                    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                        LogIn
                                    </button>
                                </Link>
                                <Link to="/adminsignup">
                                    <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                            <img className="object-cover object-center rounded" alt="hero" src={Landingimg3} />
                        </div>
                    </div>
                    <div id="logreg">
                        <section class="text-gray-600 body-font">
                            <h1 className="title-font sm:text-4xl text-3xl mt-5 mb-0 font-bold text-gray-900 text-center">For Company Login</h1>
                            <div class="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
                                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                    <img class="object-cover object-center rounded" alt="hero" src={companyimg} />
                                </div>
                                <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">To Use This Platform Effectively
                                        <br class="hidden lg:inline-block" />Please Login For <span className='text-red-600'>Companies</span>
                                    </h1>
                                    <p class="mb-8 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quaerat enim, rem natus commodi illum labore vitae exercitationem maxime quis mollitia beatae vel vero molestias nobis officia facere, aliquid ratione ipsum! Sapiente, aut nemo!</p>
                                    <div class="flex justify-center">
                                        <Link to="/companylogin"><button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">LogIn</button>
                                        </Link>
                                        <Link to="/companyregister"><button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Register</button></Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>

        </>
    );
}

export default Landingmaincomp;
