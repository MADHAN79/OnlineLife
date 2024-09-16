import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register); //eg: 'https://onlinelife.onrender.com/api/v1/user/register' see the api route in index.js
router.route('/login').post(login);
router.route('/logout').get(logout);

//getProfile got accessed using the next() parameter in isAuthenticate.js, similarly all below.
router.route('/:id/profile').get(isAuthenticated, getProfile); //eg: https://onlinelife.onrender.com/api/v1/user/66e46fc2e6bf3641ac8b380b/profile

router.route('/profile/edit').post(isAuthenticated, upload.single('profilePhoto'), editProfile); //upload coming from multer.js in middleware folder.
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default router;
