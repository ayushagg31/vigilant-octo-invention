// pages/api/view/[id].js

import { fetchObject } from "../../../services/r2.service";
import logger from "../../../services/logging.service";

export default async (req, res) => {
  const { id: objectKey } = req.query;

  const bucketName = "pdfs";

  try {
    const pdfData = await fetchObject({ bucketName, objectKey });

    // Set the appropriate Content-Type header
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF stream to the response
    res.send(pdfData);
  } catch (error) {
    logger.error("Error fetching object from R2 bucket", error);
    res.status(500).send("Internal Server Error");
  }
};
