import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import "./CommunityCarousel.css";
import {Link} from "react-router-dom";

const HomeCommunityCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  /*Keep description <400 letters limit */
  const testimonials = [
    {
      title: "Invaluable Resource",
      content:
        "I use iNaturalist to share information with other people who are interested in Madagascan plants. It is also an opportunity for me to validate the photos and information recorded during field trips, and to provide information on species distribution for the IUCN Red List assessments.",
      author: "Hélène Ralimanana",
      role: "Team Manager, Kew Madagascar Conservation Centre",
      imageUrl:
        "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
      location: "Madagascar",
    },
    {
      title: "A Nature Enthusiast's Dream",
      content:
        "As a child I was constantly outside searching for bugs and other creatures. Unfortunately that need to explore faded away as I became older. Now that I've been hiking more often, this site has helped bring back that side of myself. I don't just look at a plant and see a plant. I get close enough to see what could be crawling on that plant, and I want to know everything about it.",
      author: "Danielle Doyle",
      role: "Actress, Amateur Naturalist",
      imageUrl:
        "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
      location: "Oakland, California, USA",
    },
    {
      title: "Educational and Fun",
      content:
        "No matter where in the world you are, iNaturalist brings people together. Whether you have a PhD or just love the outdoors, iNaturalist will bring you closer to nature and many fellow naturalists. Viva Naturalista!!",
      author: "Carlos G. Velazco Macias",
      role: "Biologist",
      imageUrl:
        "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
      location: "Mexico",
    },
  ];

  return (
    <div className="community-carousel-container">
      <h3 className="community-carousel-title">
        Community Members of MyEcologist
      </h3>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
        {testimonials.map((testimonial, idx) => (
          <Carousel.Item key={idx}>
            <div className="testimonial-content-container">
              <div className="testimonial-text">
                <blockquote className="blockquote">
                  <p className="mb-0">{testimonial.content}</p>
                </blockquote>
                <footer className="blockquote-footer">
                  <Link
                    to={"/profile/${testimonial.author}"}
                    className="author-link"
                  >
                    {testimonial.author}
                  </Link>
                  <div className="author-role">{testimonial.role}</div>
                  <div className="testimonial-location">
                    <MdLocationOn className="location-icon" />
                    {testimonial.location}
                  </div>
                </footer>
              </div>
              <div className="testimonial-image-container">
                <img
                  className="testimonial-image rounded-circle shadow-1-strong"
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCommunityCarousel;
