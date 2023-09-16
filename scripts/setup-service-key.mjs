import fs from "fs";
import "dotenv/config";

// Get the base64-encoded environment variable
const serviceKey = process.env.FIREBASE_SERVICE_KEY;

if (!serviceKey) {
  console.error("Environment variable serviceKey found or empty.");
  process.exit(1);
}

// Decode the base64 string
const serviceAccount = Buffer.from(serviceKey, "base64").toString("utf-8");

try {
  // Write the decoded JSON to a file
  fs.writeFileSync("servicekey.json", serviceAccount, "utf-8");
  console.info("JSON data written to servicekey.json.");
} catch (error) {
  console.error("Error writing JSON to file:", error);
  process.exit(1);
}
