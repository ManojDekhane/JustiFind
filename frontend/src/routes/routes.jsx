// routes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../component/landingPage";
import Mythsvsfactpage from "../pages/mythFactPage";
import Navbar from "../component/Navbar";
import  Layout from "../routes/layout";
import InfoDetails from "../pages/mythFactDetailPage";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
         <Route path="/" element={<LandingPage />} />
         <Route path='/myths' element={<Mythsvsfactpage/>}/>
           <Route path="/info/:topic" element={<InfoDetails />} />
         </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
