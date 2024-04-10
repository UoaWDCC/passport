import { Request, Response } from "express"
import { Router } from "express"
import User from "../db/User"

const userRoutes = Router()

// GET /api/users
userRoutes.get("/", async (req: Request, res: Response) => {
  // Logic to fetch all users from the database
  try {
    const results = await User.find()
    const users = results.map((user) => user.toObject())
    return res.json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/user/:upi
userRoutes.get("/:upi", (req: Request, res: Response) => {
  const userUpi = req.params.upi
  // Logic to fetch a specific user by ID from the database
  try {
    const user = User.findOne({ upi: userUpi })
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// POST /user
userRoutes.post("/", (req: Request, res: Response) => {
  const userData = req.body

  // Logic to create a new user in the database
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    accessToken: req.body.accessToken,
    upi: req.body.upi,
  })

  try {
    const savedUser = newUser.save()
    res.status(201).json(savedUser)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

// PUT /user/:id
userRoutes.put("/:id", (req: Request, res: Response) => {
  const userId = req.params.id
  const updatedUserData = req.body

  // Logic to update a specific user by ID in the database
  try {
    const updatedUser = User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    )
    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /users/:id
// userRoutes.delete("/:id", (req: Request, res: Response) => {
//   const userId = req.params.id

//   // Logic to delete a specific user by ID from the database
//   // ...

//   // Send the response with a success message
//   res.json({ message: "User deleted successfully" })
// })

export default userRoutes
