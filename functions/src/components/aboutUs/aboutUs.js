"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _reactBootstrap = require("react-bootstrap");

var _profileCard = _interopRequireDefault(require("./profileCard"));

var AboutUs = function AboutUs() {
  if (typeof window !== "undefined") {
    var myFunction = function myFunction() {
      if (window.scrollY > 1550) {
        (0, _jquery.default)(".profile-card").addClass("profile-card-anim");
      }
    };

    window.onscroll = function () {
      myFunction();
    };
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "about-us-container"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "about-us-heading"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "About ", /*#__PURE__*/_react.default.createElement("span", null, "Us"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "about-us-text"
  }, "We both were sophormores in 2019 when we thought of giving back what we've learnt through the internet. When we completed web development and successfully worked together on a several successfull freelancing projects, Our friends and clasmates started asking how and where did we learn from , that's when we had an idea to create a platform that guides students like us who want to learn and achieve something without enrolling for some paid courses. CodersGala took almost a year to finish and is'nt even finished yet , we plan on adding a ton of features and other skills like Android Development, DataStructures and ALgorithms etc. to CodersGala in future.")), /*#__PURE__*/_react.default.createElement("div", {
    className: "profile-cards"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    lg: 6
  }, /*#__PURE__*/_react.default.createElement(_profileCard.default, {
    data: {
      name: "Priya",
      portfolioUrl: "priyabihaniportfolio.firebaseapp.com",
      instaUrl: "https://www.instagram.com/bihani.priya",
      githubUrl: "https://github.com/PriyaBihani",
      twitterUrl: "https://www.linkedin.com/in/priya-bihani-81a5661b8/",
      bio: "Aspiring programmer and a second year IT undergrad student"
    }
  })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    lg: 6
  }, /*#__PURE__*/_react.default.createElement(_profileCard.default, {
    data: {
      name: "Kartik",
      portfolioUrl: "https://google.com",
      instaUrl: "https://www.instagram.com/gkartik18/",
      githubUrl: "https://github.com/Kartik18g",
      twitterUrl: "https://www/twitter.com",
      bio: "Aspiring programmer and a second year IT undergrad student"
    }
  })))));
};

var _default = AboutUs;
exports.default = _default;