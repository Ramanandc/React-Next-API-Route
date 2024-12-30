

// get all list of gold transactions

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Fetch the gold rate from GoldAPI.io
    const response = await axios.get(process.env.GOLD_API_URL, {
      headers: {
        'x-access-token': process.env.API_KEY, // GoldAPI authentication
        'Content-Type': 'application/json',
      },
    });

    const goldRate = response.data;

    // Convert the price to per gram and format the response
    res.status(200).json({
      success: true,
      data: {
        ratePerGram: goldRate.price / 31.1035, // Convert price/oz to price/gram
        currency: goldRate.currency,
        date: goldRate.timestamp,
      },
    });
  } catch (error) {
    console.error('Error fetching gold rate:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch the latest gold rate.',
    });
  }
}
