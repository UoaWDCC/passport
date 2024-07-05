import { MongoClient } from 'mongodb';

// Aggregation pipeline
const agg = (accessToken: String) => [
  {
      '$match': {
          'accessToken': accessToken
      }
  },
  {
      '$project': {
          '_id': 1,
          'firstName': 1,
          'lastName': 1,
          'email': 1,
          'accessToken': 1,
          'upi': 1,
          'eventList': 1,
          'totalStamps': {
              '$size': '$eventList'
          },
          'stampsLeft': {
              '$cond': [
                  { '$eq': [{ '$size': '$eventList' }, 0] },
                  5,
                  { '$mod': [{ '$size': '$eventList' }, 5] }
              ]
          },
          'prizesAchieved': {
              '$floor': { '$divide': [{ '$size': '$eventList' }, 5] }
          }
      }
  }
];

const totalStampsCalc = async (accessToken: String) => {
    const client = new MongoClient("mongodb+srv://inezchong7:WDCCpa55p0rt@cluster0.hviqnfy.mongodb.net/WDCC_Passport?retryWrites=true&w=majority&appName=Cluster0");

    try {
        await client.connect();
        const coll = client.db('WDCC_Passport').collection('Users');
        const cursor = coll.aggregate(agg(accessToken));
        const result = await cursor.toArray();
        return result;
    } catch (error) {
        console.error('Error during database operation:', error);
        throw error;
    } finally {
        await client.close();
    }
}

export default totalStampsCalc;
