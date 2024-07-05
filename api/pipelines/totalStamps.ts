import mongoose from 'mongoose';
import User from '../db/User';

mongoose.connect(process.env.DATABASE_URL!)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const totalStampsCalc = async (accessToken: String) => {
    try {
        const result = await User.aggregate([
            { '$match': { 'accessToken': accessToken } },
            {
                '$project': {
                    '_id': 1,
                    'firstName': 1,
                    'lastName': 1,
                    'email': 1,
                    'accessToken': 1,
                    'upi': 1,
                    'eventList': 1,
                    'totalStamps': { '$size': '$eventList' },
                    'stampsLeft': {
                        '$cond': [
                            { '$eq': [{ '$size': '$eventList' }, 0] },
                            5,
                            { '$subtract': [5, { '$mod': [{ '$size': '$eventList' }, 5] }] }
                        ]
                    },
                    'prizesAchieved': { '$floor': { '$divide': [{ '$size': '$eventList' }, 5] } }
                }
            }
        ]);

        if (result.length > 0) {
            const user = result[0];
            const { _id, totalStamps, stampsLeft, prizesAchieved } = user;
            await User.updateOne(
                { _id: user._id },
                { $set: { totalStamps, stampsLeft, prizesAchieved } }
            );
        }

        return result;
    } catch (error) {
        console.error('Error during database operation:', error);
        throw error;
    }
};

const closeDatabaseConnection = async () => {
    await mongoose.disconnect();
};

process.on('SIGINT', closeDatabaseConnection);
process.on('SIGTERM', closeDatabaseConnection);

export default totalStampsCalc;
