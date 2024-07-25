const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load OAuth2 client credentials
const credentials = JSON.parse(fs.readFileSync('path/to/credentials.json'));

// Create an OAuth2 client
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Generate the URL to get the authentication token
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
});

console.log('Authorize this app by visiting this URL:', authUrl);

// Exchange authorization code for tokens and save them
const getAccessToken = (code) => {
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFileSync('path/to/token.json', JSON.stringify(token));
        console.log('Token stored to', 'path/to/token.json');
    });
};

// Load saved tokens
if (fs.existsSync('path/to/token.json')) {
    const token = JSON.parse(fs.readFileSync('path/to/token.json'));
    oAuth2Client.setCredentials(token);
}

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const sendInvitation = (guests, eventDetails) => {
    const event = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
            dateTime: eventDetails.start,
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: eventDetails.end,
            timeZone: 'America/Los_Angeles',
        },
        attendees: guests.map(guest => ({ email: guest.email })),
    };

    calendar.events.insert({
        auth: oAuth2Client,
        calendarId: 'primary',
        resource: event,
    }, (err, event) => {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created: %s', event.htmlLink);
    });
};

module.exports = {
    getAccessToken,
    sendInvitation
};
