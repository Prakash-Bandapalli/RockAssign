const axios = require("axios");

const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
const PING_TARGET_URL = RENDER_EXTERNAL_URL ? `${RENDER_EXTERNAL_URL}/` : null;
const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes in milliseconds

let keepAliveIntervalId = null;

const selfPing = async () => {
  if (!PING_TARGET_URL) {
    console.log(
      "[Keep-Alive-Self] RENDER_EXTERNAL_URL not set. Skipping self-ping."
    );
    return;
  }

  try {
    console.log(`[Keep-Alive-Self] Sending self-ping to ${PING_TARGET_URL}...`);
    const response = await axios.get(PING_TARGET_URL, { timeout: 30000 }); // 30-second timeout
    console.log(
      `[Keep-Alive-Self] Self-ping to ${PING_TARGET_URL} successful: Status ${response.status}`
    );
  } catch (error) {
    if (error.response) {
      console.error(
        `[Keep-Alive-Self] Self-ping to ${PING_TARGET_URL} received error status: ${error.response.status} - ${error.message}`
      );
    } else if (error.request) {
      console.error(
        `[Keep-Alive-Self] Self-ping to ${PING_TARGET_URL} failed (No Response): ${error.message}`
      );
    } else {
      console.error(
        `[Keep-Alive-Self] Self-ping to ${PING_TARGET_URL} failed (Request Setup Error): ${error.message}`
      );
    }
  }
};

const startKeepAlive = () => {
  if (process.env.NODE_ENV === "production" && RENDER_EXTERNAL_URL) {
    console.log(
      `[Keep-Alive-Self] Production environment detected. Starting self keep-alive task for URL: ${PING_TARGET_URL} with interval ${
        PING_INTERVAL_MS / 1000 / 60
      } minutes.`
    );
    setTimeout(selfPing, 5000); // Initial ping after 5 seconds
    keepAliveIntervalId = setInterval(selfPing, PING_INTERVAL_MS);
  } else {
    let reason = "";
    if (process.env.NODE_ENV !== "production")
      reason += "Not a production environment. ";
    if (!RENDER_EXTERNAL_URL) reason += "RENDER_EXTERNAL_URL not set. ";
    console.log(
      `[Keep-Alive-Self] Self keep-alive task skipped. Reason: ${reason.trim()}`
    );
  }
};

const stopKeepAlive = () => {
  if (keepAliveIntervalId) {
    clearInterval(keepAliveIntervalId);
    console.log("[Keep-Alive-Self] Self keep-alive task stopped.");
    keepAliveIntervalId = null;
  }
};

module.exports = { startKeepAlive, stopKeepAlive, selfPing };
