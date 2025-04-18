import { Request, Response } from "express";
import { Router } from "express";
import User from "../db/User";
import Prize from "../db/Prize";
import totalStampsCalc from "../pipelines/totalStamps";

const userRoutes = Router();

userRoutes.get(
    "/total-stamps/:accessToken",
    async (req: Request, res: Response) => {
        const accessToken = req.params.accessToken;
        try {
            const result = await totalStampsCalc(accessToken);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
);

// GET /api/users
userRoutes.get("/", async (req: Request, res: Response) => {
    // Logic to fetch all users from the database
    try {
        const results = await User.find();
        const users = results.map((user) => user.toObject());
        return res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

userRoutes.post("/check-user", async (req: Request, res: Response) => {
    const accessToken = req.body.accessToken;

    try {
        const response = await User.findOne({
            accessToken: accessToken,
        }).exec();
        // console.log(response);
        if (response != undefined && response !== null) {
            res.status(200).json({ user: response, success: true });
        } else {
            res.status(200).json({
                success: false,
                error: "User not found",
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, errorMessage: error });
    }
});

// GET /api/user/:upi
userRoutes.get("/:upi", async (req: Request, res: Response) => {
    const userUpi = req.params.upi;
    try {
        const user = await User.findOne({ upi: userUpi }).exec(); // Await the result or use exec()
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/user
userRoutes.post("/", (req: Request, res: Response) => {
    const userData = req.body;

    // Logic to create a new user in the database
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        accessToken: req.body.accessToken,
        upi: req.body.upi,
        eventList: [],
    });

    try {
        const savedUser = newUser.save();
        res.status(201).json(savedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/user/:upi
userRoutes.put("/:upi", async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { upi: req.params.upi }, // Filter criteria
            req.body, // Updated data
            { new: true } // Return the updated document
        ).exec(); // Execute the query

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

//Redeem Prize Endpoint
// POST /api/user/redeem-prize/:accessToken
userRoutes.post(
    "/redeem-prize/:accessToken",
    async (req: Request, res: Response) => {
        const accessToken = req.params.accessToken;
        try {
            const user = await User.findOne({
                accessToken: accessToken,
            }).exec();
            if (user) {
                //Logic check if user has enough stamps
                const userStamps = user.eventList.length;
                const userPrizes = await Prize.find({
                    userId: user._id,
                }).exec();

                if (userStamps / 5 <= userPrizes.length) {
                    res.status(400).json({
                        message: "User has already redeemed prize",
                    });
                    return;
                }

                const prize = new Prize({
                    userId: user._id,
                    redeemed: false,
                    redeemedTime: Date.now(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                });
                const savedPrize = await prize.save();
                res.status(201).json(savedPrize);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
);

userRoutes.get(
    "/redeemed-prizes/:accessToken",
    async (req: Request, res: Response) => {
        const accessToken = req.params.accessToken;
        try {
            const user = await User.findOne({
                accessToken: accessToken,
            }).exec();

            if (user) {
                const userPrizesRedeemed = await Prize.find({
                    $and: [{ userId: user._id }, { redeemed: true }],
                }).exec();
                console.log("Successfully obtained data");
                res.json(userPrizesRedeemed.length);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            console.error("Unable to find any matching user", error);
        }
    }
);

export default userRoutes;
