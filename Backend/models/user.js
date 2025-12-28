import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
export default User;



// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   googleId: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model("User", userSchema);
// export default User;