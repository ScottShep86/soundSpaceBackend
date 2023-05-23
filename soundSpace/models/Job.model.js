const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Producer', 
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    jobType: {
      type: String,
      enum: [
        "Producer",
        "Mixing Engineer",
        "Mastering Engineer",
        "Songwriter",
        "Beatmaker",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
