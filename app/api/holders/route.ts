import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all holders
export async function GET(request : any ) {
  console.log('GET request', request);
  try {
    const holders = await prisma.holder.findMany();
    return NextResponse.json(holders, { status: 200 });
  } catch (error) {
    console.error('Error fetching holders:', error);
    return NextResponse.json({ error: 'Failed to fetch holders' }, { status: 500 });
  }
}
