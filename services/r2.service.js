import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import logger from "./logging.service";

const s3Client = new S3Client({
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
});

export const uploadObject = async ({ bucketName, objectKey, buffer }) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: objectKey,
    Body: buffer,
    ContentType: "application/pdf",
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    console.error(`Error uploading file to S3:${objectKey}`, error);
    throw new Error(`Error uploading file to S3:${objectKey}`);
  }
};

export const fetchObject = async ({ bucketName, objectKey }) => {
  const fetchParams = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(fetchParams));
    const pdfData = data.Body; // Buffer

    return pdfData;
  } catch (error) {
    logger.error(`Error fetching object - ${objectKey} from R2 bucket`, error);
    throw new Error(`Error fetching object - ${objectKey} from R2 bucket`);
  }
};

export const deleteObject = async ({ bucketName, objectKey }) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };
  try {
    await s3Client.send(new DeleteObjectCommand(params));
    logger.warn(`Object deleted successfully: ${objectKey}`);
  } catch (error) {
    logger.error(`Error deleting object - ${objectKey} from R2 bucket`, error);
  }
};
