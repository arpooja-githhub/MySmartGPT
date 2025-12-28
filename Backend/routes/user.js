

import express from "express";
import { googleLogin } from "../controllers/authController.js";

const router = express.Router();



router.get("/test", (req, res) => {
  res.send("test pass");
});




// Make sure this matches your frontend GET request
// router.get("/auth/google", googleLogin);

router.get("/google", googleLogin);




export default router;
