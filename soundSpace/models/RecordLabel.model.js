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
    logo: {
      type: String,
      required: false
    },
    location: {
      type: String,
    },
    aboutUs: {
      type: String,
    },
    associatedActs: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true
  }
);

const RecordLabel = model("RecordLabel", recordLabelSchema);

module.exports = RecordLabel;
