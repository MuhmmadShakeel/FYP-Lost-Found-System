import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

/* User Components */
import Navbar from "./components/userscomponents/common/Navbar.jsx";
import Footer from "./components/userscomponents/common/Footer.jsx";

/* User Pages */
import HomePage from "./pages/systemuserspages/HomePage.jsx";
import AboutPage from "./pages/systemuserspages/AboutPage.jsx";
import ServicesPage from "./pages/systemuserspages/ServicesPage.jsx";
import ContactPage from "./pages/systemuserspages/ContactPage.jsx";
import ReportLostPage from "./pages/systemuserspages/ReportLostPage.jsx";
import ReportFoundPage from "./pages/systemuserspages/ReportFoundPage.jsx";
import LoginPage from "./pages/systemuserspages/LoginPage.jsx";
import SignUp from "./components/userscomponents/signup/SignUp.jsx";
import Sidebar from "./components/admindashboard/admincommon/Sidebar.jsx";
import AdminNav from "./components/admindashboard/admincommon/AdminNav.jsx";
import Overviewpage from "./pages/adminpages/overviewpage.jsx";
import AdminLostReportPage from "./pages/adminpages/AdminLostReportPage.jsx";
import AdminFoundReportPage from "./pages/adminpages/AdminFoundReportPage.jsx";
import DashboardUserPage from "./pages/adminpages/DashboardUserPage.jsx";
import UserReviwsPage from "./pages/adminpages/UserReviwsPage.jsx";
import { ToastContainer } from 'react-toastify';




function App() {
  return (
    <>
      <Routes>

           {/* user routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
                 <div>
                  <ToastContainer />
                 </div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/report-lost" element={<ReportLostPage />} />
                <Route path="/report-found" element={<ReportFoundPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUp />} />

              </Routes>

              <Footer />
            </>
          }
        />

     {/* admin route */}

        <Route
          path="/admin/*"
          element={
            <div className="flex">

              <Sidebar/>
              <AdminNav/> 

              <Routes>
            <Route path="overview" element={<Overviewpage />} />
            <Route path="lostreport" element={<AdminLostReportPage />} />
            <Route path="foundreport" element={<AdminFoundReportPage />} />
            <Route path="dashboarduser" element={<DashboardUserPage />} />
            <Route path="userreviews" element={<UserReviwsPage />} />
         </Routes>
            </div>
          }
        />

      </Routes>
    </>
  );
}

export default App;