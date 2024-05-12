// import { Request, Response } from "express"
// import { Router } from "express"
// import User from "../db/User"
// import Events from "../db/Events";

// const eventRouter = Router()

// eventRouter.post('/event', async (req: Request, res: Response) => {
//     const eventName = req.body.eventName;
//     const stamp64 = req.body.stamp64;
//     const startDate = req.body.startDate;
//     const endDate = req.body.endDate;

//     const event = {
//       "eventName": eventName,
//       "stamp64": stamp64,
//       "startDate": new Date(startDate),
//       "endDate": new Date(endDate),
//       "totalAttended": 1000
//     };
//     try {
//       //inserting event into DB
//       const result = await Events.save(event);
//       console.log(`A document was inserted with id ${result.insertedId}`);

//       const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=192.168.178.30:5173/${result.insertedId}&amp;size=100x100`
//       const result2 = await eventCollection.updateOne({ _id: new ObjectId(result.insertedId) }, { $set: { "QRcode": qrCode } })
//       console.log(qrCode)

//     } catch (error) {
//       console.log(error);
//       return res.status(500).send("Error inserting document into MongoDB.");
//     }

//     return res.status(200).send(`Event successfully created`);
//   });


// export default eventRouter
