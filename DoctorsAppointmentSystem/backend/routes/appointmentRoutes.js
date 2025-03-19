const express = require("express");
const router = express.Router();
let appointments = [];

router.post("/", (req, res) =>{
    const appointment = req.body;
    appointments.push(appointment);
    res.json({message: "Appointment Booked", appointment});
});

module.exports = router;