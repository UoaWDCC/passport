import { Router } from 'express';
import type { Request, Response } from 'express';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { config } from 'dotenv';
import { object } from 'zod';
import User from '../db/User';
import mongoose from 'mongoose';
import axios from 'axios';
import { S3Client } from '@aws-sdk/client-s3';
import multer from "multer";
const multerS3 = require('multer-s3')


config();

//setting up Mongo client
const uri: string = process.env.DATABASE_URL!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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

//Mongo connected routes
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Define routes after successful connection
    const Api: any = Router();

    //Route to add information into mongoDB
    Api.post('/event',upload.single('file'), async (req: Request, res: Response) => {
      const eventName = req.body.eventName;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const file = req.file as any;
      let fileLink = "";

      if (file && file.location){
        fileLink = file.location
      } else {
        return res.status(400).json({error: "S3 bucket image upload failed"})
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
        const database = client.db("WDCC_Passport");
        const eventCollection = database.collection("Events");

        //inserting event into DB
        const result = await eventCollection.insertOne(event);
        console.log(`A document was inserted with id ${result.insertedId}`);

        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=192.168.178.30:5173//${result.insertedId}&amp;size=100x100`
        const result2 = await eventCollection.updateOne({ _id: new ObjectId(result.insertedId) }, { $set: { "QRcode": qrCode } })

      } catch (error) {
        console.log(error);
        return res.status(500).send("Error inserting document into MongoDB.");
      }

      return res.status(200).send(`Event successfully created`);
    });

    //Route to get all events created
    Api.get("/get-all-events", async (req: Request, res: Response) => {
      try {
        const database = client.db("WDCC_Passport");
        const eventCollection = database.collection("Events");

        const cursor = await eventCollection.find({})
        const result = await cursor.toArray()
        // console.log(result)
        for(let i=0; i<result.length; i++){
          if (new Date() >= result[i].startDate && new Date() <= result[i].endDate ){
            result[i]["status"] = true
          } else {
            result[i]["status"] = false
          }
        }


        res.status(200).send(result)
      } catch (error) {
        console.log(error);
        return res.status(500).send("Issue with database");
      }
    });

    //check event validity 
    Api.get("/check-event-status/:eventId", async (req: Request, res: Response) => {
      try {
        const eventId = req.params.eventId
        if (mongoose.Types.ObjectId.isValid(eventId)) {
          const objectId = new ObjectId(eventId)
          const database = client.db("WDCC_Passport")
          const eventCollection = database.collection("Events")

          const result = await eventCollection.findOne({ _id: objectId })
          if (result?.startDate && result?.endDate && new Date() >= result.startDate && new Date() <= result.endDate) {
            result["status"] = true;
            console.log("sdfsdfsdfsdfsdf",result)
            res.status(200).json({
              result:result,
              error: "none"
            })
          } else if (result?.startDate && result?.endDate) {
            result["status"] = false;
            res.status(200).json({
              result:result,
              error: "event not active"
            })
          } else {
            return res.status(200).json({ result: {error: "event not found", status: false }})
          }
          
        } else {
          return res.status(200).json({result: { status: false },error: "event not found"})
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json("Issue with database")
      }
    })

    Api.post("/attend-event", async (req: Request, res: Response) => {
      const eventId = req.body.eventId;
      const user = req.body.upi;
      console.log(eventId)

      if (mongoose.Types.ObjectId.isValid(eventId)) {
        const database = client.db("WDCC_Passport")
        const eventCollection = database.collection("Events")
        const objectId = new ObjectId(eventId)

        console.log(user)

        const resUser = await User.updateOne({ "upi": user },
          {
            $addToSet: { eventList: eventId }
          }
        ).exec()

        if (resUser.modifiedCount == 1) {
          const eventAddRes = await eventCollection.updateOne({ _id: objectId },
            {
              $inc: { totalAttended: 1 }
            }
          )
          return res.status(200).json({
            user: user,
            eventId: eventId,
            added: true,
            message: "successfully attended event"
          })
        } else if (resUser.modifiedCount == 0) {
          return res.status(200).json({
            user: user,
            eventId: eventId,
            added: false,
            message: "Already attended event"
          })
        } else {
          return res.status(200).json({
            user: user,
            eventId: eventId,
            added: false,
            message: "QR code error"
          })
        }
      }else{
        return res.json({added: false, message: "Invalid event Id"})
      }

    })

    return Api
  } finally {
  }
}

export default run().catch(console.error);

