const { Schema, model } = require("mongoose");

const producerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A name is required.']
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
    picture: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    },
    aboutMe: {
      type: String,
      required: false
    },
    associatedActs: {
      type: [String],
      trim: true,
      required: false
    },
    genre: {
      type: String,
      enum: ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Classical', 'Electronic', 'Country', 'R&B', 'Reggae', 'Alternative', 'Metal'],
      required: false
    },
    favoriteProducers: {
      type: [Schema.Types.ObjectId],
      ref: "Producer",
      required: false,
    },
  },
  {  
    timestamps: true
  }
);

const Producer = model("Producer", producerSchema);

module.exports = Producer;
