// import React, { useState } from 'react'
// import Button from '../../@/components/Button'
// import axios from 'axios'

// function Navbar({ onSearchResult }) {
//     const [input, setInput] = useState('');

//     const handleclick = (e) => {
//         e.preventDefault(); // Prevent the default form submission behavior

//         axios.post('http://localhost:5000/api/company', {
//             company_name: `${input}`
//         })
//             .then((response) => {
//                 console.log(response.data[0]);
//                 // Call the function passed as a prop with the search result
//                 onSearchResult(response.data[0]);

//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };






//     const LogIn = "LogIn"
//     const SignIn = "SignIn"
//     return (
//         <>
//             <nav className= "navbar navbar-expand-lg bg-dark navbar-dark">
//                 <div className= "container-fluid">
//                     <button className= "navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className= "navbar-toggler-icon"></span>
//                     </button>
//                     <div className= "collapse navbar-collapse d-flex justify-content-around" id="navbarTogglerDemo01">
//                         <div>
//                             <a className= "navbar-brand" href="#">LOGO</a>
//                         </div>
//                         <div>
//                             <form className= "d-flex" role="search">
//                                 <input className= "form-control me-2"
//                                     type="search"
//                                     placeholder="Search"
//                                     aria-label="Search"
//                                     value={input}
//                                     onChange={(e) => setInput(e.target.value)}
//                                 />
//                                 <button className= "btn btn-outline-success"
//                                     onClick={handleclick}
//                                 >Search</button>
//                             </form>
//                         </div>
//                         <div className='d-flex justify-content-around'>
//                             <div className="d-flex mx-3">
//                                 <Button value={LogIn} />
//                             </div>
//                             <div className="d-flex mx-3">
//                                 <Button value={SignIn} />
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }

// export default Navbar


import React, { useState } from 'react';
import Button from '../../@/components/Button';
import axios from 'axios';
import CampusConnectLogo from '../../@/images/CampusConnectLogoFinal.png';

function Navbar({ onSearchResult }) {
    const [input, setInput] = useState('');

    const handleclick = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/company', {
            company_name: `${input}`
        })
            .then((response) => {
                console.log(response.data[0]);
                onSearchResult(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const LogIn = "LogIn";
    const SignIn = "SignIn";

    return (
        <>
            <nav className=" text-dark p-4" style={{ backgroundColor: '#DAF7A6' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <a href="#" className="text-dark text-xl font-bold">LOGO</a>
                    </div>
                    <div>
                        <form className="flex" role="search">
                            <input
                                className="form-input px-4 py-2 mr-2 rounded border border-dark"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                className="bg-green-500 text-white font-bold px-4 py-2 rounded"
                                onClick={handleclick}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="flex space-x-3">
                        <div className="mx-3">
                            {/* <Button value={LogIn} /> */}
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                LogIn
                            </button>
                        </div>

                        <div className="mx-3">
                            {/* <Button value={SignIn} /> */}
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                SignIn
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
