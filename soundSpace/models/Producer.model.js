const { Schema, model } = require("mongoose");

const recordLabelSchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, 'A company name is required.']
    },
    email: {
      type: String,
      required: [true, 'An email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'A password is required.']
    },
    Picture: {
      type: String,
      required: false
    },
    Location: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    associatedActs: {
      type: String,
      trim: true
    },
    genre: {
      type: String,
      enum: ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Classical', 'Electronic', 'Country', 'R&B', 'Reggae', 'Alternative', 'Metal']
    }
  },
  {  
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
