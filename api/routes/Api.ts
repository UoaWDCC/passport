import { Router } from 'express';
import type { Request, Response } from 'express';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { config } from 'dotenv';
import { object } from 'zod';
import User from '../db/User';

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
    Api.post('/event', async (req: Request, res: Response) => {
      const eventName = req.body.eventName;
      const stamp64 = req.body.stamp64;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;

      const event = {
        "eventName": eventName,
        "stamp64": stamp64,
        "startDate": new Date(startDate),
        "endDate": new Date(endDate),
        "totalAttended": 1000
      };
      try {
        const database = client.db("WDCC_Passport");
        const eventCollection = database.collection("Events");

        //inserting event into DB
        const result = await eventCollection.insertOne(event);
        console.log(`A document was inserted with id ${result.insertedId}`);

        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=192.168.178.30:5173/${result.insertedId}&amp;size=100x100`
        const result2 = await eventCollection.updateOne({ _id: new ObjectId(result.insertedId) }, { $set: { "QRcode": qrCode } })
        console.log(qrCode)

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
        for (let i = 0; i < result.length; i++) {
          if (new Date() >= result[i].startDate && new Date() <= result[i].endDate) {
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
        // const eventId = req.params.eventId
        const eventId = "663c59fe7493ceabaae7b781"
        const objectId = new ObjectId(eventId)

        const database = client.db("WDCC_Passport")
        const eventCollection = database.collection("Events")

        const result = await eventCollection.findOne({ _id: objectId })
        if (result?.startDate && result?.endDate && new Date() >= result.startDate && new Date() <= result.endDate) {
          result["status"] = true;
        } else if (result?.startDate && result?.endDate) {
          result["status"] = false
        } else {
          return res.status(401).json({ error: "event not found" })
        }

        res.status(200).json(result)
      } catch (error) {
        console.log(error)
        return res.status(500).send("Issue with database")
      }
    })

    Api.post("/attend-event", async (req: Request, res: Response) => {
      const eventId = req.body.eventId;
      const user = req.body.upi;
      // const eventId = "663a031cecff7c5e2189eaaa"
      // const user = "jdoe123"

      const database = client.db("WDCC_Passport")
      const eventCollection = database.collection("Events")
      const objectId = new ObjectId(eventId)

      console.log(user)

      const resUser = await User.updateOne({"upi": user},
        {
          $addToSet: {eventList: eventId}
        }
      ).exec()

      if(resUser.modifiedCount == 1){
        const eventAddRes = await eventCollection.updateOne({_id: objectId},
          {
            $inc: {totalAttended: 1}
          }
        )
        return res.status(200).json({
          user: user,
          eventId: eventId,
          added: true,
          message: "successfully attended event"
        })
      }else if(resUser.modifiedCount == 0){
        return res.status(200).json({
          user: user,
          eventId: eventId,
          added: false,
          message: "already attended event"
        })
      }else{
        return res.status(200).json({
          user: user,
          eventId: eventId,
          added: false,
          message: "QR code error"
        })
      }
    })

    return Api
  } finally {
  }
}

export default run().catch(console.error);

