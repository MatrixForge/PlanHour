const { google } = require("googleapis");
const fs = require("fs");
const { getDB } = require("./config/db"); // Import getDB function from db.js

const credentialsPath = "C:\\Users\\haniy\\Downloads\\oauth.json";

function getCredentials() {
  try {
    const credentials = fs.readFileSync(credentialsPath, "utf-8");
    return JSON.parse(credentials);
  } catch (error) {
    console.error("Error reading or parsing the credentials file", error);
    return null;
  }
}

const credentials = getCredentials();

if (!credentials || !credentials.web || !credentials.web.redirect_uris) {
  console.error("Missing required fields in credentials");
  process.exit(1);
}

async function storeToken(token) {
  const db = getDB(); // Use getDB to get the connection
  const collection = db.collection("tokens");
  const result = await collection.updateOne(
    { id: "oauth_token" },
    { $set: { token } },
    { upsert: true }
  );
  console.log("Token stored to MongoDB", result);
}

async function getTokenFromDatabase() {
  const db = await getDB(); // Use getDB to get the connection
  const collection = db.collection("tokens");
  const doc = await collection.findOne({ id: "oauth_token" });
  return doc ? doc.token : null;
}

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Authorize this app by visiting this URL:", authUrl);

const getAccessToken = (code) => {
  oAuth2Client.getToken(code, async (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oAuth2Client.setCredentials(token);
    await storeToken(token);
  });
};

(async () => {
  const token = await getTokenFromDatabase();
  if (token) {
    oAuth2Client.setCredentials(token);
  }
})();

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const sendInvitation = (guests, eventDetails) => {
  const event = {
    summary: eventDetails.summary,
    location: eventDetails.location,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.start,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: eventDetails.end,
      timeZone: "America/Los_Angeles",
    },
    attendees: guests.map((guest) => ({ email: guest.email })),
  };

  calendar.events.insert(
    {
      auth: oAuth2Client,
      calendarId: "primary",
      resource: event,
    },
    (err, event) => {
      if (err) {
        console.log("There was an error contacting the Calendar service: " + err);
        return;
      }
      console.log("Event created: %s", event.htmlLink);
    }
  );
};

module.exports = {
  getAccessToken,
  sendInvitation,
};
