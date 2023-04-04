const express = require("express");
const router = express.Router();
const meetingController = require("../controller/controller.meetings");
router.post("", meetingController.createRoom);
router.get("/invited", meetingController.getMeetingInvited);
router.get("/owner", meetingController.getMeetingOwner);
// Create a new meeting

module.exports = router;
