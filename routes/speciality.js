const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  addSpeciality,
  getAllSpecialities,
  getSpecialityById,
  updateSpeciality,
  removeSpeciality,
} = require("../controllers/speciality");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../middleware/index");

router.param("userId", getUserById);
router.param("specialityId", getSpecialityById);

router.post(
  "/speciality/add/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  [check("ArticleContent", "Article can not be empty").notEmpty()],
  [check("Name", "Speciality name can not be empty").notEmpty()],
  [check("imageUrl", "ImageURL can not be empty").notEmpty()],
  addSpeciality
);

router.get("/speciality/all", getAllSpecialities);

router.put(
  "/speciality/update/:specialityId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getSpecialityById,
  updateSpeciality
);

router.delete(
  "/speciality/remove/:specialityId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeSpeciality
);

module.exports = router;
