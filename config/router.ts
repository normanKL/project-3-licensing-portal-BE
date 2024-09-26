//- config/router.ts

import express from "express";
import {
  signup,
  login,
  getCurrentUser,
  getAllUsers
} from "../controllers/userController";
import {
  createSpecialist,
  updateSpecialist,
  deleteSpecialist,
  getSpecialistsByUser,
  getAllSpecialists,
  getSpecialists,
  getSpecialistById,
  getSpecialistsByRegion
} from "../controllers/specialistController";
import secureRoute from "../middleware/secureRoute";

const router = express.Router()

router.route("/").get((req, res) => {
  res.send("Welcome to the Homepage!")
})

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/user").get(secureRoute, getCurrentUser)
router.route("/team").get(secureRoute, getAllUsers)
router.route("/specialists").get(getAllSpecialists)
router.route("/create-specialist").post(secureRoute, createSpecialist)
router.route("/specialists/search").get(secureRoute, getSpecialists)
router.route("/specialists/:specialistId")
  .put(secureRoute, updateSpecialist)
  .delete(secureRoute, deleteSpecialist)
  .get(secureRoute, getSpecialistById)
router.route("/specialists/user/:userId").get(getSpecialistsByUser)
router.route("/specialists/region").get(secureRoute, getSpecialistsByRegion)

export default router;