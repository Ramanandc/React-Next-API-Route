import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all incomes
export async function GET() {
        try {
                const mf = await prisma.mutualFundNav.findMany();
                return NextResponse.json(mf);
        } catch (error) {
                return NextResponse.error();
        }
}