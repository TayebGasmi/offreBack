const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const meetingSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
  invited: { type: [mongoose.Schema.Types.ObjectId], ref: "user" },
  startTime: { type: Date, required: true },
  name: { type: String, required: true },
  url: { type: String },
  token: { type: String },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: "offer" },
});
const Meeting = mongoose.model("meeting", meetingSchema, "meeting");
module.exports = Meeting;
