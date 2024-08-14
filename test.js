require("dotenv").config();
const fetch = require("node-fetch");

const CLIENT_ID = ""
const CLIENT_SECRET = ""

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

async function getMyProfile(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return await response.json();
}

async function main() {
  try {
    const accessToken = await getAccessToken();
    console.log("Access Token:", accessToken);

    const profile = await getMyProfile(accessToken);
    console.log("Profile:", JSON.stringify(profile, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
