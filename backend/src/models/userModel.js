const mongoose = require('mongoose');

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true, default: "" },
    refreshTokenHash: {type: String, required: false, default: ""}
  },
  { timestamps: true }
);

const User = mongoose.model('User', userModel);

export default userModel;