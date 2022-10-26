import mongoose from "mongoose";
import validator from "validator";
import { User } from "../types/databaseTypes";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  image: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el: string) {
        return el === (this as mongoose.Document & User).password;
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bycrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  (this.passwordConfirm as any) = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
