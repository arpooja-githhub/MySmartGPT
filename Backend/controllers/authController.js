// import { oauth2client } from "../utils/googleConfig.js";
// import axios from "axios";
// import UserModel from "../models/user.js";
// import jwt from "jsonwebtoken";

// export const googleLogin = async (req, res) => {
//   try {
//     const { code } = req.query;

//     const googleRes = await oauth2client.getToken(code);
//     oauth2client.setCredentials(googleRes.tokens);

//     const userRes = await axios.get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//     );

//     const { email, name, picture } = userRes.data;

//     let user = await UserModel.findOne({ email });
//     if (!user) {
//       user = await UserModel.create({
//         name,
//         email,
//         image: picture,
//       });
//     }

//     const { _id } = user;
//     const token = jwt.sign(
//       { _id, email },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_TIMEOUT }
//     );

//     return res.status(200).json({
//       message: "Success",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };



import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      const authUrl = oauth2client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      });
      return res.redirect(authUrl);
    }

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    const user = await UserModel.findOneAndUpdate(
      { email },
      { name, image: picture },
      { upsert: true, new: true }
    );

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    // REDIRECT TO FRONTEND
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}`
    );

  } catch (error) {
    console.error("Google OAuth Error:", error);
    res.status(500).send("Google login failed");
  }
};




// import { oauth2client } from "../utils/googleConfig.js";
// import axios from "axios";
// import UserModel from "../models/user.js";
// import jwt from "jsonwebtoken";

// export const googleLogin = async (req, res) => {
//   try {
//     const { code } = req.query;

//     // Get tokens from Google
//     const googleRes = await oauth2client.getToken(code);
//     oauth2client.setCredentials(googleRes.tokens);

//     // Get user info from Google
//     const userRes = await axios.get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//     );

//     const { email, name, picture } = userRes.data;

//     //  Upsert user in MongoDB
//     const user = await UserModel.findOneAndUpdate(
//       { email },                      // find by email
//       { name, image: picture },        // update name and image
//       { upsert: true, new: true }      // create if not exists, return doc
//     );

//     // Generate JWT token
//     const token = jwt.sign(
//       { _id: user._id, email },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_TIMEOUT }
//     );


    

//     // Send response
//     return res.status(200).json({
//       message: "Success",
//       token,
//       user,
//     });

//   } catch (error) {
//     console.error("Google OAuth Error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };
