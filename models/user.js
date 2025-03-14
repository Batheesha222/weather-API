const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: {type: String, required: true}

  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
