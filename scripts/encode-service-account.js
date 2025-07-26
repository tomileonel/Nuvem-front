#!/usr/bin/env node

/**
 * Helper script to encode Google Service Account JSON to base64
 * Usage: node scripts/encode-service-account.js path/to/service-account.json
 */

const fs = require("fs");
const path = require("path");

function encodeServiceAccount(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error("❌ Error: File not found:", filePath);
      process.exit(1);
    }

    // Read the JSON file
    const keyFile = fs.readFileSync(filePath, "utf8");

    // Validate JSON
    try {
      const parsed = JSON.parse(keyFile);
      if (!parsed.type || parsed.type !== "service_account") {
        console.error(
          "❌ Error: This doesn't appear to be a service account JSON file"
        );
        process.exit(1);
      }
    } catch (error) {
      console.error("❌ Error: Invalid JSON file");
      process.exit(1);
    }

    // Encode to base64
    const base64Key = Buffer.from(keyFile).toString("base64");

    console.log("✅ Service account JSON encoded successfully!");
    console.log("\nAdd this to your .env.local file:");
    console.log("GOOGLE_SERVICE_ACCOUNT_KEY=" + base64Key);
    console.log("\nFull .env.local example:");
    console.log("GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here");
    console.log("GOOGLE_SHEETS_SHEET_NAME=WebhookData");
    console.log("GOOGLE_SERVICE_ACCOUNT_KEY=" + base64Key);
  } catch (error) {
    console.error("❌ Error encoding file:", error.message);
    process.exit(1);
  }
}

// Get command line argument
const filePath = process.argv[2];

if (!filePath) {
  console.log("📝 Google Service Account Encoder");
  console.log("\nUsage:");
  console.log(
    "  node scripts/encode-service-account.js <path-to-service-account.json>"
  );
  console.log("\nExample:");
  console.log(
    "  node scripts/encode-service-account.js ~/Downloads/service-account-key.json"
  );
  process.exit(1);
}

encodeServiceAccount(path.resolve(filePath));
