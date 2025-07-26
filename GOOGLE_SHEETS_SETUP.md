# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for your webhook endpoint.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. A Google Sheet where you want to save webhook data

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service account**
3. Fill in the service account details:
   - **Name**: `webhook-sheets-service`
   - **Description**: `Service account for webhook Google Sheets integration`
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 4: Create Service Account Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** format
6. Click **Create** - this will download a JSON file

## Step 5: Prepare Your Google Sheet

1. Create a new Google Sheet or use an existing one
2. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Share the sheet with your service account:
   - Click **Share** button
   - Add the service account email (from the JSON file: `client_email`)
   - Give it **Editor** permissions

## Step 6: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_SHEET_NAME=WebhookData

# Google Service Account Credentials (Base64 encoded JSON)
GOOGLE_SERVICE_ACCOUNT_KEY=your_base64_encoded_service_account_json_here
```

### To encode your service account JSON:

**On macOS/Linux:**

```bash
base64 -i path/to/your/service-account-key.json
```

**On Windows:**

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\your\service-account-key.json"))
```

**Using Node.js:**

```javascript
const fs = require("fs");
const keyFile = fs.readFileSync("path/to/your/service-account-key.json");
const base64Key = Buffer.from(keyFile).toString("base64");
console.log(base64Key);
```

## Step 7: Test the Integration

1. Start your Next.js development server:

   ```bash
   npm run dev
   ```

2. Test the webhook endpoint:

   ```bash
   curl -X GET http://localhost:3000/api/end-call
   ```

   You should see `"googleSheetsConfigured": true` in the response.

3. Send a test webhook with proper HMAC signature to verify data saving.

## Sheet Structure

The webhook will create a sheet named "WebhookData" (or whatever you specify in `GOOGLE_SHEETS_SHEET_NAME`) with the following columns:

- **Timestamp**: ISO timestamp of when the webhook was received
- **Payload**: The full webhook payload (JSON stringified)
- **Event Type**: Currently always "webhook-received"
- **Formatted Date**: Human-readable date and time

## Troubleshooting

### Common Issues:

1. **"Google Sheets not configured"**: Check that both `GOOGLE_SERVICE_ACCOUNT_KEY` and `GOOGLE_SHEETS_SPREADSHEET_ID` are set
2. **Permission denied**: Make sure you shared the sheet with the service account email
3. **Sheet not found**: Verify the spreadsheet ID is correct
4. **Invalid credentials**: Check that the base64 encoding of the service account JSON is correct

### Logs to Check:

- ✅ **Success**: "Data saved to Google Sheet successfully!"
- ⚠️ **Skipped**: "Google Sheets not configured - skipping sheet save"
- ❌ **Error**: "Error saving to Google Sheet: [error details]"

## Security Notes

- Never commit your `.env.local` file to version control
- Store your service account JSON file securely
- Consider using environment-specific service accounts for production
- Regularly rotate your service account keys
