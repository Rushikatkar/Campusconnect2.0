import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Forgotpassword from './components/forgotpassword/Forgotpassword'
import Resetpassword from './components/resetpassword/Resetpassword'
import Landingpage from './pages/Landingpage/Landingpage';
import StudentMainpage from './pages/StudentMainpage/StudentMainpage';
import Makeprofile from './pages/Profilepage/Makeprofilepage/Makeprofile'
import Viewprofile from './pages/Profilepage/Viewprofilepage/Viewprofile';
import CompanyDetail from './pages/StudentMainpage/Companydata/CompanyDetail';
import ViewJobs from './pages/StudentMainpage/Jobs/ViewJobs';
import AdminLogin from './components/login/AdminLogin';
import AdminSignup from './components/signup/AdminSignup';
import AdminLandingpage from './pages/AdminMainpage/AdminLandingpage/AdminLandingpage';
import Companysignup from './components/signup/CompanySignup';
import CompanyLogin from './components/login/CompanyLogin';
import Companymaincomp from './pages/Companypage/Companymaincomp/Companymaincomp';
import Jobsection from './pages/Companypage/Jobsection/Jobsection';
import CampusJob from './pages/StudentMainpage/Jobs/CampusJob/CampusJob';
import AdminJob from './pages/AdminMainpage/AdminJobSection/AdminJob';
import CreatedAllJobs from './pages/Companypage/CreatedAllJobs/CreatedAllJobs';
import JobCandidatesPage from './pages/Companypage/CreatedAllJobs/Jobcandidatepage/JobCandidatePage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/resetpassword' element={<Resetpassword/>}/>
      <Route path='/studentprofile' element={<StudentMainpage/>}/>
      <Route path='/makeprofile' element={<Makeprofile/>}/>
      <Route path='/viewprofile' element={<Viewprofile/>}/>
      <Route path="/company/:company_name" element={<CompanyDetail/>} />
      <Route path='/jobs' element={<ViewJobs/>}/>
      <Route path='/campusjobs' element={<CampusJob/>}/>


      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/adminsignup' element={<AdminSignup/>}/>
      <Route path='/admin' element={<AdminLandingpage/>}/>
      <Route path='/adminjob' element={<AdminJob/>}/>


      <Route path='/companyregister' element={<Companysignup/>}/>
      <Route path='/companylogin' element={<CompanyLogin/>}/>
      <Route path='/company' element={<Companymaincomp/>}/>
      <Route path='/createjob' element={<Jobsection/>}/>
      <Route path='/createdjobs' element={<CreatedAllJobs/>}/>
      <Route path="/job/:joobId" element={<JobCandidatesPage/>} />





    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
