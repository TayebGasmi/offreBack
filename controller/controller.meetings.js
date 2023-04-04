const Meeting = require("../models/model.meeting");
const User = require("../models/model.user");
const Companies = require("../models/model.company");
const Offres = require("../models/model.offre");
const { sendMeetingEmail } = require("../utils/mail");
axios = require("axios");
const createMeeting = async (req, res) => {
  try {
    const { owner, invited, startTime, duration, title } = req.body;
    const meeting = new Meeting({
      owner,
      invited,
      startTime,
      duration,
      title,
    });
    await meeting.save();
    const ownerUser = await User.findById(owner);
    const invitedUser = await User.findById(invited);
    sendMeetingEmail(ownerUser, invitedUser, meeting);
    return res.status(200).json(meeting);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
axios = require("axios");
// const owner={

//   exp: 1548633621,
//   room_name: "hello",
//   "user_name": "A. User",
//   "is_owner": true,
//   "close_tab_on_exit": true,
//   "enable_recording": "cloud", "start_video_off": true

// }
const properties = {
  enable_prejoin_ui: true,
  enable_chat: true,
  lang: "en",
  enable_new_call_ui: true,
  enable_emoji_reactions: true,
};
const api = axios.create({
  baseURL: process.env.DAILY_URL,
  headers: { Authorization: `Bearer ${process.env.DAILY_KEY}` },
});
exports.createRoom = async (req, res) => {
  const offerId = req.params.offerId;
  const offer = await Offres.findById(offerId);

  try {
    const response = await api.post("/rooms", {
      properties,
      name: offer.name,
    });
    const { url } = response.data.url;
    const newMeetings = new Meeting({
      owner: offer.owner,
      name: offer.name,
      url,
      invited: req.body.invited,
      startTime,
    });
    await newMeetings.save();
    return response.json(newMeetings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getRooms = async (req, res) => {
  try {
    const { data: room } = await api.get("/");
    return res.status(200).json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
