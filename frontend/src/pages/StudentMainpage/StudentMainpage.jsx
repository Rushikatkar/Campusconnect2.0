import React from 'react'
import Companydata from './Companydata/Companydata'
// import Jobs from '../../components/jobs/Jobs'
import Footer from '../../components/Footer/Footer'
import StudentNavbar from '../../components/Navbar/StudentNavbar'
function StudentMainpage() {
    return (
        <>
            <div>
                <div>
                    <StudentNavbar />
                </div>
                <div>
                    <Companydata />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>

    )
}

export default StudentMainpage
