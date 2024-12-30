import axios from "axios";



export async function GET(res: any) {
        try {
                if (!process.env.GOLD_API_URL) {
                    throw new Error('GOLD_API_URL is not defined');
                }
                const response = await axios.get(process.env.GOLD_API_URL, {
                        headers: {
                                'x-access-token': process.env.API_KEY,
                                'Content-Type': 'application/json',
                        },
                });
                const goldRate = response.data;
                res.status(200).json({
                        success: true,
                        data: {
                                ratePerGram: goldRate.price / 31.1035,
                                currency: goldRate.currency,
                                date: goldRate.timestamp,
                        },
                });
        }
        catch (error) {
                console.error('Error fetching gold rate:', error.message);
                res.status(500).json({
                        success: false,
                        message: 'Failed to fetch the latest gold rate.',
                });
        }
}