import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS only in development
// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: process.env.CLIENT_URL || "http://localhost:5173",
//       credentials: true,
//     })
//   );
// }
const allowedOrigins = ["https://mysmartgpt.onrender.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Session
// Session with MongoStore
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Your MongoDB connection string
      collectionName: "sessions",        // Optional: name of collection to store sessions
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true if using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);


/* ROUTES */
app.use("/api", chatRoutes);
app.use("/api/auth", userRoutes);

/* SERVE REACT IN PRODUCTION */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
  });
}

/* SERVER + DB */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

































// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import session from "express-session";
// import path from "path";

// import dotenv from "dotenv";

// import chatRoutes from "./routes/chat.js";

// import userRoutes from "./routes/user.js";


// import { fileURLToPath } from "url";

// // Fix __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// dotenv.config();

// const app = express();
// const PORT = 8080;

// /*MIDDLEWARE*/
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//      origin:"http://localhost:5173",
//   credentials: true,
 
//   })
// );

// app.use(express.static(path.join(__dirname, "../Frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
// });

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: false,
//     // cookie: { secure: false }, // set true only for https
//     cookie: {
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
// }

//   })
// );





// /* -------------------- ROUTES -------------------- */
//  // or auth.js
// app.use("/", userRoutes);
// app.use("/api", chatRoutes);

// /* -------------------- SERVER + DB -------------------- */
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection failed", err);
//   }
// };

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectDB();
// });
























// app.use(session(sessionOptions));












// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   input: 'difference between sql and mysql',
// });

// console.log(response.output_text);