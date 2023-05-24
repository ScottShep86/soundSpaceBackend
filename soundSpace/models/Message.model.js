const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    job: {
      type: [Schema.Types.ObjectId],
      ref: 'Job'
    },
    createdBy: {
      type: [Schema.Types.ObjectId],
      ref: 'Producer', 
    },
    comment: {
      type: String,
      required: true,
    },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
