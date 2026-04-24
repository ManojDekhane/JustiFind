import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../component/LandingPage";
import MythFactPage from "../pages/MythFactPage";
import Navbar from "../component/Navbar";
import  Layout from "../routes/Layout";
import MythFactDetails from "../pages/MythFactDetailPage";
import LegalNews from "../pages/newspage";
import Register from "../component/register";
import Login from "../component/login";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
         <Route path="/" element={<LandingPage />} />
         <Route path='/myths' element={<MythFactPage/>}/>
           <Route path="/info/:topic" element={<MythFactDetails />} />
           <Route path='/news' element={<LegalNews/>}/>
           <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            
          
         

         </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
