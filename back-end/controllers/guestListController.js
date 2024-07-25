const express = require('express');
const bodyParser = require('body-parser');
const { sendInvitation, getAccessToken } = require('../googleCalendar');

const app = express();
app.use(bodyParser.json());

exports.sendInvitations =(req, res) => {
    const { guests, eventDetails } = req.body;
    sendInvitation(guests, eventDetails);
    res.status(200).send('Invitations sent');
}

// Endpoint to get access token
exports.oAuth2callback = (req, res) => {
    const code = req.query.code;
    getAccessToken(code);
    res.send('Access token retrieved and stored. You can now send invitations.');
};

