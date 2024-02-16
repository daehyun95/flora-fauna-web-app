import React from "react";
import "./Home.css";
import HowItWorks from "./HowItWorks/HowItWorks";
import KeepRecord from "./KeepRecord/KeepRecord";
import BeAnEcologiist from "./BeAnEcologist/BeAnEcologist";
import DontMissOut from "./DontMissOut/DontMissOut";
import HomeMainCarousel from "./Carousel/Carousel";
import HomeCommunityCarousel from "./CommunityCarousel/CommunityCarousel";

const Home = () => (
  <div className="Home">
    <HomeMainCarousel />
    <HowItWorks />
    <KeepRecord />
    <HomeCommunityCarousel />
    <BeAnEcologiist />
    <DontMissOut />
  </div>
);

export default Home;
