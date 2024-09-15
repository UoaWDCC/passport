import { Request, Response } from "express";
import { Router } from "express";
import multer from "multer";

const imageRoutes = Router();

import {
    CreateBucketCommand,
    PutObjectCommand,
    S3Client,
  } from '@aws-sdk/client-s3';

  const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, './WDCCEventImages'),
//     filename: (req, file, cb) =>
//       cb(
//         null,
//         `${file.fieldname}-${Date.now()}.${file.originalname.split('.').pop()}`
//       ),
//   });
//   const upload = multer({ storage });

const storage = multer.memoryStorage();
const upload = multer({ storage });



imageRoutes.post("/upload-images/:eventId", upload.fields([{ name: 'qrcode', maxCount: 1 }, { name: 'stamp', maxCount: 1 }]), async (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  try {
    // Retrieve files from multer upload
    const qrcodeFile = req.body["qrcode"];
    const stampFile = req.body["stamp"];

    if (!qrcodeFile || !stampFile) {
      return res.status(400).send('Missing required files.');
    }

    // Upload QR code to S3
    // const qrCodeKey = `events/${eventId}/qrcode-${Date.now()}.${qrcodeFile.originalname.split('.').pop()}`;
    const qrCodeKey = `events/${eventId}/qrcode-${Date.now()}.${qrcodeFile}`;

    // const qrcodeUploadParams = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME!,
    //   Key: qrCodeKey,
    //   Body: qrcodeFile.buffer,
    // };

    // const qrcodeUploadResponse = await s3Client.send(new PutObjectCommand(qrcodeUploadParams));
    // console.log('QR code uploaded successfully:', qrcodeUploadResponse);

    // Upload stamp to S3
    // const stampKey = `events/${eventId}/stamp-${Date.now()}.${stampFile.originalname.split('.').pop()}`;
    const stampKey = `events/${eventId}/stamp-${Date.now()}`;

    // const stampUploadParams = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME!,
    //   Key: stampKey,
    //   Body: stampFile.buffer,
    // };

    // const stampUploadResponse = await s3Client.send(new PutObjectCommand(stampUploadParams));
    // console.log('Stamp uploaded successfully:', stampUploadResponse);

    console.log(qrcodeFile.originalname)

    // Return S3 keys or URLs for stamp and QR code
    return res.status(200).json({
      stampKey: stampKey,
      qrCodeKey: qrCodeKey,
    });
  } catch (error) {
    console.error('Error uploading images to S3:', error);
    return res.status(500).send('Error uploading images to S3.');
  }
});
// imageRoutes.get("/get-all-events-v2")
  

  export default imageRoutes