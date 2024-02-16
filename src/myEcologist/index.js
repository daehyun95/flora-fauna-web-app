import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home/Home";
import Footer from "./Footer";
import Login from "./Login/Login";
import HomeMainCarousel from "./Home/Carousel/Carousel";
import HomeCommunityCarousel from "./Home/CommunityCarousel/CommunityCarousel";
import SignUp from "./Login/SignUp";
import About from "./About/About";
import Explore from "./Explore";
import Observation from "./Explore/Observation";
import Community from "./Community";
import Profile from "./Community/profile";
import Results from "./Results/Results";
import AccountDisplay from "./Login/account-display";
import EditUser from "./Login/EditUser";
import HeaderWrapper from "./Header/HeaderWrapper";


function Ecologist() {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Explore/:observationId" element={<Observation />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Community/:userId" element={<Profile />} />
        <Route path="/Results/:query" element={<Results />} />
        <Route path="/Login/account" element={<AccountDisplay />} />
        <Route path="/users/:userId/edit" element={<EditUser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Ecologist;
