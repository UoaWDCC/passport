import { Router } from 'express';
import type { Request, Response } from 'express';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { config } from 'dotenv';
import { object } from 'zod';

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

        //QR code link generated linking to wdccpassport.com with event id as Param
        // const qrCode =`https://api.qrserver.com/v1/create-qr-code/?data=www.wdccpassport.com/${result.insertedId}&amp;size=100x100`
        const qrCode =`https://api.qrserver.com/v1/create-qr-code/?data=192.168.178.30:5173/${result.insertedId}&amp;size=100x100`
        const result2 = await eventCollection.updateOne({_id: new ObjectId(result.insertedId)}, {$set:{"QRcode": qrCode}})
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
        for(let i=0; i<result.length; i++){
          if (new Date() >= result[i].startDate && new Date() <= result[i].endDate ){
            result[i]["status"] = true
          }else{
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
        const objectId = new ObjectId(eventId)

        const database = client.db("WDCC_Passport")
        const eventCollection = database.collection("Events")

        const result = await eventCollection.findOne({ _id: objectId})
        
        console.log(result)

        res.status(200).send(result)
      }catch (error) {
        console.log(error)
        return res.status(500).send("Issue with database")
      }
    })

    return Api
  } finally {
  }
}

export default run().catch(console.error);

