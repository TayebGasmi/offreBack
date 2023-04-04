const express = require("express");
const router = express.Router();
const meetingController = require("../controller/controller.meetings");
router.post("", meetingController.createRoom);
// Create a new meeting

module.exports = router;
