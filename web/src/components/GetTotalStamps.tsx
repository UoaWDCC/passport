import axios from 'axios';

// calls endpoint which updates the total stamps of the user via the aggregation pipeline

const updateStampValues = async (accessToken: String | null) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/total-stamps/${accessToken}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching total stamps:', error);
        throw error;
    }
};

export default updateStampValues;