"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

// import logo10 from "./logo10.PNG";
var TopSection = function TopSection() {
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "floatingHero"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "floatingHero-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "https://luna1.co/57d9b6.png",
    alt: "",
    className: "floatingHero-image -two -floatingDelay"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "https://luna1.co/2070ee.png",
    alt: "",
    className: "floatingHero-image -three -floating"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "https://luna1.co/fda860.png",
    alt: "",
    className: "floatingHero-image -four -floatingDelay"
  }), /*#__PURE__*/_react.default.createElement("header", {
    className: "floatingHero-header"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "floatingHero-label"
  }, "This is..."), /*#__PURE__*/_react.default.createElement("h1", {
    className: "floatingHero-headline "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cg_logo"
  })), /*#__PURE__*/_react.default.createElement("p", {
    className: "floatingHero-description"
  }, "Coders Gala is a free to use platform, which will help and guide you, not only to learn web development but become a free-lancer like us. So click on play and embark a new journey with us."), /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: "/learn"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "video-play -coral -small -pulse"
  })))));
};

var _default = TopSection;
exports.default = _default;