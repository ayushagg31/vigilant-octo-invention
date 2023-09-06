import pdfjs from "pdfjs-dist";

/************************************************
TODO: PDF/Video Size Limit, PDF Pages Limit, PDF Count Limit, Video Count Limit
Computation should be done on a per-day basis until the subscription expires.
************************************************/

// Temporary Plan:
// - 100 pages per document (max 15MB) => implement in /upload, /download (usageMiddleware)
// - Max upload size: 15MB => implement in /upload, /download (usageMiddleware)
// - 50 questions per day => implement in /chat API call (usageMiddleware)
// - 1 document per day => implement in /upload, /download (usageMiddleware)
// - Max video size: 15MB => implement in /ytTranscribe (usageMiddleware)
// - 1 video per day => implement in /ytTranscribe (usageMiddleware)


const MAX_PDF_PAGE_COUNT = 100;
const MAX_PDF_SIZE_MB = 30;
const MAX_DOCUMENT_PER_DAY = 1;
const MAX_VIDEO_SIZE_MB = 15;
const MAX_VIDEO_PER_DAY = 2;
const MAX_QUESTIONS_PER_DAY = 50;

const UsageMiddleware = function (handler) {
  return async function (req, res) {
    try {
      const file = req.file;
      const { userEmail } = req.body;
      const fileType = file.originalname.split(".").pop();
      if (fileType === "pdf") {
        const pdfData = new Uint8Array(file.buffer);
        const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
        const numPages = pdfDocument.numPages;
        const fileSizeBytes = file.buffer.length;
        const fileSizeMB = fileSizeBytes / (1024 * 1024);
        if (numPages > MAX_PDF_PAGE_COUNT || fileSizeMB > MAX_PDF_SIZE_MB) {
          return res.status(400).json({
            error: "PDF exceeds page count or size limits",
          });
        }

        // check for total pdf collection uploaded today
        // if count matches/exceed MAX_DOCUMENT_PER_DAY then rejects it
        
      }
    } catch (err) {}
    // pass back to handler
    return handler(req, res);
  };
};

export default UsageMiddleware;