import React from "react";
import $ from "jquery";
import { Row, Col } from "react-bootstrap";
import ProfileCard from "./profileCard";

const AboutUs = () => {
  if (typeof window !== "undefined") {
    window.onscroll = function () {
      myFunction();
    };

    function myFunction() {
      if (window.scrollY > 1550) {
        $(".profile-card").addClass("profile-card-anim");
      }
    }
  }

  return (
    <div className="about-us-container">
      <div>
        <div className="about-us-heading">
          <h2>
            About <span>Us</span>
          </h2>
        </div>
        <div className="about-us-text">
          We both were sophormores in 2019 when we thought of giving back what
          we've learnt through the internet. When we completed web development
          and successfully worked together on a several successfull freelancing
          projects, Our friends and clasmates started asking how and where did
          we learn from , that's when we had an idea to create a platform that
          guides students like us who want to learn and achieve something
          without enrolling for some paid courses. CodersGala took almost a year
          to finish and is'nt even finished yet , we plan on adding a ton of
          features and other skills like Android Development, DataStructures and
          ALgorithms etc. to CodersGala in future.
        </div>
      </div>
      <div className="profile-cards">
        <Row>
          <Col lg={6}>
            <ProfileCard
              data={{
                name: "Priya",
                portfolioUrl: "priyabihaniportfolio.firebaseapp.com",
                instaUrl: "https://www.instagram.com/bihani.priya",
                githubUrl: "https://github.com/PriyaBihani",
                twitterUrl:
                  "https://www.linkedin.com/in/priya-bihani-81a5661b8/",
                bio:
                  "Aspiring programmer and a second year IT undergrad student",
              }}
            />
          </Col>

          <Col lg={6}>
            <ProfileCard
              data={{
                name: "Kartik",
                portfolioUrl: "https://google.com",
                instaUrl: "https://www.instagram.com/gkartik18/",
                githubUrl: "https://github.com/Kartik18g",
                twitterUrl: "https://www/twitter.com",
                bio:
                  "Aspiring programmer and a second year IT undergrad student",
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutUs;
