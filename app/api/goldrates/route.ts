import axios from "axios";
import { NextResponse } from 'next/server';

export async function GET() {
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
                console.log('goldRate:', goldRate);
                return NextResponse.json({
                        success: true,
                        data: {
                                ratePerGram: goldRate.price / 31.1035,
                                currency: goldRate.currency,
                                date: goldRate.timestamp,
                        },
                });
        } catch (error: any) {
                console.error('Error fetching gold rate:', error.message);
                return NextResponse.json({
                        success: false,
                        message: 'Failed to fetch the latest gold rate.',
                }, { status: 500 });
        }
}
