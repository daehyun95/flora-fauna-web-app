import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Carousel.css";

const HomeMainCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselItems = [
    {
      id: 1,
      imageUrl: "https://static.inaturalist.org/photos/324411983/medium.jpeg",
      common_name: "Superb Fairywren",
      place_guess: "Belgrave South VIC 3160, Australia",
    },
    {
      id: 2,
      imageUrl:
        "https://inaturalist-open-data.s3.amazonaws.com/photos/324415095/medium.jpeg",
      common_name: "Red Collared-Dove",
      place_guess:
        "P8RF+27H, Mud Road Through Jayamangali Blackbuck Sanctuary, Mydanahalli, Karnataka 572127, India",
    },
    {
      id: 3,
      imageUrl: "https://static.inaturalist.org/photos/324434611/medium.jpg",
      common_name: "Tricolored Heron",
      place_guess: "N Mayberry Rd, Palmhurst, TX, US",
    },
  ];

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="carousel-align-center"
        interval={3000}
      >
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id} className="set-main-carousel-height">
            <div
              className="carousel-background-image"
              style={{ backgroundImage: "url(" + item.imageUrl + ")" }}
            />
            <Carousel.Caption className="carousel-text-to-left">
              <h3>{item.common_name}</h3>
              <p>{item.place_guess}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeMainCarousel;
