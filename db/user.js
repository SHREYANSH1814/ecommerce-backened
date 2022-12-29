const mongoose = require("./conn");
const validator = require("validator");
const pincodev = require("pincode-validator");
const userschema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [
      (value) => {
        if (validator.isEmail(value)) {
          return true;
        }
        return false;
      },
      "email is not valid",
    ],
  },
  city: {
    type: String,
    default: "India",
  },
  state: {
    type: String,
    default: "India",
  },

  Address: String,

  pincode: {
    type: String,
    validate: [
      (value) => {
        return pincodev.validate(value);
      },
      "pincode is not valid",
    ],
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
  },
  password: {
    type: String,
    maxlength: [25, "password is too big"],
    minlength: [4, "password is too short"],
  },
  confpassword: String,
  resettoken: String,
});

userschema.pre("save", function (next) {
  // the object is accessed by this keyword
  if (this.password == this.confpassword) {
    this.confpassword = undefined;
    next();
  } else {
    throw new Error("password is incorrect matching");
  }
});

const user = mongoose.model("user", userschema);

module.exports = user;
