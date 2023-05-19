const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    createdBy: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Producer", // Reference to the "Producer" model
      },
      {
        type: [Schema.Types.ObjectId],
        ref: "RecordLabel", // Reference to the "RecordLabel" model
      },
    ],
    comment: {
      type: String,
      required: true,
    },
    rating: { type: Number, required: true },

    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
