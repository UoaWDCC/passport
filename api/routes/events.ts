import { Router } from "express"
import type { Request, Response } from 'express';
import Events from "../db/Events"
import { MongoClient } from "mongodb";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import mongoose from "mongoose";
const multerS3 = require('multer-s3')
import User from '../db/User';

interface Event {
    eventName: string;
    startDate: Date;
    endDate: Date;
    status?: boolean;  // Optional property
    totalAttended?: number;  // Optional property
    QRcode?: string | null;  // Optional property with null type
}

const eventsRoute = Router()

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
eventsRoute.post('/add-event', upload.single('file'), async (req: Request, res: Response) => {
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
        "eventName": "eventName",
        "stamp64": fileLink,
        // "startDate": new Date(startDate),
        // "endDate": new Date(endDate),
        "startDate": new Date(),
        "endDate": new Date(),
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

//Route to get all events created
eventsRoute.get("/get-all-events1", async (req: Request, res: Response) => {
    try {
        const events: Event[] = await Events.find({}).lean();
        const result = events ?? [];
        console.log(result)
        if (result && result.length > 0) {

            result.forEach(event => {
                if (new Date() >= event.startDate && new Date() <= event.endDate) {
                    event.status = true
                } else {
                    event.status = false
                    console.log(event)
                }
            })
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Issue with database");
    }
});

//Route to get single evenet 
eventsRoute.get("/get-single-event1/:eventId", async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    try {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ "error message": "Invalid event ID" });
        }
        const result = await Events.findById(eventId).exec();
        console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ "error message": error })
    }
})

eventsRoute.get("/check-event-status1/:eventId", async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId;

        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(200).json({ result: { status: false }, error: "Invalid event ID" });
        }
        const event = await Events.findById(eventId).exec();

        if (event === null) {
            return res.status(200).json({ result: { status: false }, error: "event not found" });
        }

        const result = event.toObject() as typeof event & { status: boolean };

        if (result) {
            if (result.startDate && result.endDate && new Date() >= result.startDate && new Date() <= result.endDate) {
                result.status = true;
                res.status(200).json({
                    result: result,
                    error: "none"
                });
            } else if (result.startDate && result.endDate) {
                result.status = false;
                res.status(200).json({
                    result: result,
                    error: "event not active"
                });
            } else {
                return res.status(200).json({ result: { error: "event not found", status: false } });
            }
        } else {
            return res.status(200).json({ result: { status: false }, error: "event not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Issue with database" });
    }
});

eventsRoute.post("/attend-event1", async (req: Request, res: Response) => {
    const eventId = req.body.eventId;
    const user = req.body.upi;
    console.log("hello")
    console.log(eventId);

    if (mongoose.Types.ObjectId.isValid(eventId)) {
        console.log(user);

        const resUser = await User.updateOne(
            { upi: user },
            { $addToSet: { eventList: eventId } }
        ).exec();

        if (resUser.modifiedCount == 1) {
            const eventAddRes = await Events.updateOne(
                { _id: eventId },
                { $inc: { totalAttended: 1 } }
            ).exec();

            return res.status(200).json({
                user: user,
                eventId: eventId,
                added: true,
                message: "successfully attended event"
            });
        } else if (resUser.modifiedCount == 0) {
            return res.status(200).json({
                user: user,
                eventId: eventId,
                added: false,
                message: "Already attended event"
            });
        } else {
            return res.status(200).json({
                user: user,
                eventId: eventId,
                added: false,
                message: "QR code error"
            });
        }
    } else {
        return res.json({ added: false, message: "Invalid event Id" });
    }
});


export default eventsRoute