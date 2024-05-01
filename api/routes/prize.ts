import { Request, Response } from "express"
import { Router } from "express"
import Prize from "../db/Prize"
import User from "../db/User"

const prizeRoutes = Router()

// Create a new prize
prizeRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, redeemed, redeemedTime } = req.body
    const prize = new Prize({ userId, redeemed, redeemedTime })
    const savedPrize = await prize.save()
    res.status(201).json(savedPrize)
  } catch (error) {
    res.status(500).json({ error: "Failed to create prize" })
  }
})

// Gets all prizes that have not been redeemed
prizeRoutes.get("/non-redeemed", async (req: Request, res: Response) => {
  try {
    const prizes = await Prize.find({ redeemed: false })
    res.json(prizes)
  } catch (error) {
    res.status(500).json({ error: "Failed to get prizes" })
  }
})

// Get all prizes
prizeRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const prizes = await Prize.find()
    res.json(prizes)
  } catch (error) {
    res.status(500).json({ error: "Failed to get prizes" })
  }
})

// Get a single prize by ID
prizeRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const prize = await Prize.findById(req.params.id)
    if (!prize) {
      return res.status(404).json({ error: "Prize not found" })
    }
    res.json(prize)
  } catch (error) {
    res.status(500).json({ error: "Failed to get prize" })
  }
})

// Update a prize by ID
prizeRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, description, value } = req.body
    const updatedPrize = await Prize.findByIdAndUpdate(
      req.params.id,
      { name, description, value },
      { new: true }
    )
    if (!updatedPrize) {
      return res.status(404).json({ error: "Prize not found" })
    }
    res.json(updatedPrize)
  } catch (error) {
    res.status(500).json({ error: "Failed to update prize" })
  }
})

// Delete a prize by ID
prizeRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedPrize = await Prize.findByIdAndDelete(req.params.id)
    if (!deletedPrize) {
      return res.status(404).json({ error: "Prize not found" })
    }
    res.json({ message: "Prize deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete prize" })
  }
})

// Update the redeemed status and time of a prize by ID
prizeRoutes.post(
  "/update-redeemed/:id",
  async (req: Request, res: Response) => {
    try {
      const { redeemed, redeemedTime } = req.body
      const updatedPrize = await Prize.findByIdAndUpdate(
        req.params.id,
        { redeemed, redeemedTime },
        { new: true }
      )
      if (!updatedPrize) {
        return res.status(404).json({ error: "Prize not found" })
      }
      res.json(updatedPrize)
    } catch (error) {
      res.status(500).json({ error: "Failed to update prize" })
    }
  }
)

export default prizeRoutes
