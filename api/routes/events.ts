import { Router } from "express"
import type { Request, Response } from 'express';
import Events from "../db/Events"
import { MongoClient } from "mongodb";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
const multerS3 = require('multer-s3')

const eventsRouter = Router()

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
            cb(null, file.originalname);
        }
    })
});

//Route to add post information to mongo
eventsRouter.post('/event', upload.single('file'), async (req: Request, res: Response) => {
    const eventName = req.body.eventName;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const file = req.file as any;
    let fileLink = "";

    if (file && file.location) {
        fileLink = file.location
    } else {
        return res.status(400).json({ error: "S3 bucket image upload failed" })
    }

    const body = req.body
    console.log(body)

    const event = {
        "eventName": eventName,
        "stamp64": fileLink,
        "startDate": new Date(startDate),
        "endDate": new Date(endDate),
        "totalAttended": 0
    };
    try {
        // Inserting event into DB
        const newEvent = new Events(event);
        const result = await newEvent.save();
        console.log(`A document was inserted with id ${result._id}`);

        // Creating the QR code
        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=https://wdcc-passport-staging.fly.dev/qr-error/${result._id}&amp;size=100x100`;
        
        // Updating the event with the QR code
        result.QRcode = qrCode;
        const result2 = await result.save();

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error inserting document into MongoDB.");
    }

    return res.status(200).send(`Event successfully created`);
});