import { createHmac, timingSafeEqual } from "crypto";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET =
  "wsec_5a79c02eb530b16f765b9753a23f6ea88ed63c4e63baaa4055181839257de205";

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || "WebhookData";

function verifySignature(payload: string, signature: string): boolean {
  if (!signature) {
    return false;
  }

  // Remove 'sha256=' prefix if present
  const cleanSignature = signature.startsWith("sha256=")
    ? signature.slice(7)
    : signature;

  // Create HMAC hash of the payload
  const expectedSignature = createHmac("sha256", WEBHOOK_SECRET)
    .update(payload, "utf8")
    .digest("hex");

  // Use timing-safe comparison to prevent timing attacks
  if (cleanSignature.length !== expectedSignature.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(cleanSignature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}

async function saveToGoogleSheet(data: any) {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !SPREADSHEET_ID) {
      console.log("⚠️ Google Sheets not configured - skipping sheet save");
      return;
    }

    // Decode the base64 encoded service account key
    const serviceAccountKey = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, "base64").toString()
    );

    // Create JWT client
    const jwtClient = new google.auth.JWT({
      email: serviceAccountKey.client_email,
      key: serviceAccountKey.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Authorize the client
    await jwtClient.authorize();

    // Create sheets instance
    const sheets = google.sheets({ version: "v4", auth: jwtClient });

    // Prepare the data row
    const timestamp = new Date().toISOString();
    const payloadString =
      typeof data === "string" ? data : JSON.stringify(data);

    // Create row data - you can customize these columns as needed
    const rowData = [
      timestamp,
      payloadString,
      "webhook-received",
      new Date().toLocaleString(),
    ];

    // Check if sheet exists and has headers, if not create them
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });

      const sheet = sheetInfo.data.sheets?.find(
        (s) => s.properties?.title === SHEET_NAME
      );
      if (!sheet) {
        // Create the sheet if it doesn't exist
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: SHEET_NAME,
                  },
                },
              },
            ],
          },
        });

        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:D1`,
          valueInputOption: "RAW",
          requestBody: {
            values: [["Timestamp", "Payload", "Event Type", "Formatted Date"]],
          },
        });
      }
    } catch (error) {
      console.error("Error checking/creating sheet:", error);
    }

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("✅ Data saved to Google Sheet successfully!");
    console.log("Range updated:", response.data.updates?.updatedRange);
  } catch (error) {
    console.error("❌ Error saving to Google Sheet:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the signature from headers (common header names)
    const signature =
      request.headers.get("x-signature-256") ||
      request.headers.get("x-hub-signature-256") ||
      request.headers.get("x-signature") ||
      request.headers.get("signature");

    if (!signature) {
      console.log("❌ Webhook received but no signature header found");
      return NextResponse.json(
        { error: "Missing signature header" },
        { status: 401 }
      );
    }

    // Get the raw body for signature verification
    const body = await request.text();

    // Verify the HMAC signature
    const isValid = verifySignature(body, signature);

    if (!isValid) {
      console.log("❌ Webhook received but signature verification failed");
      console.log("Signature provided:", signature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the JSON payload if it's valid JSON
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      payload = body; // Keep as string if not valid JSON
    }

    // Log successful webhook receipt
    console.log("✅ Webhook received and verified successfully!");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Payload:", payload);
    console.log("Headers:", Object.fromEntries(request.headers.entries()));

    // Save to Google Sheet
    await saveToGoogleSheet(payload);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Webhook received and verified",
      timestamp: new Date().toISOString(),
      googleSheetSaved: !!SPREADSHEET_ID,
    });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint is ready",
    methods: ["POST"],
    description: "Send POST requests with HMAC-SHA256 signature verification",
    googleSheetsConfigured: !!SPREADSHEET_ID,
  });
}
