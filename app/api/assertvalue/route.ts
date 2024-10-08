import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all asset values
export async function GET() {
        try {
                const assetValues = await prisma.assetValue.findMany();
                return NextResponse.json(assetValues);
        } catch (error) {
                return NextResponse.error();
        }
}

// POST: Create a new asset value
export async function POST(request: any) {
        try {
                const data = await request.json();
                const assetValue = await prisma.assetValue.create({
                        data: {
                                assetId: data.assetId,
                                latestPrice: BigInt(data.latestPrice),
                                date: new Date(data.date),
                        },
                });
                return NextResponse.json(assetValue);
        } catch (error) {
                return NextResponse.error();
        }
}


// PUT: Update an existing asset value by assetValueId
export async function PUT(request: any) {
        try {
                const { assetValueId, assetId, latestPrice, date } = await request.json();
                const assetValue = await prisma.assetValue.update({
                        where: { assetValueId: BigInt(assetValueId) },
                        data: {
                                assetId,
                                latestPrice: BigInt(latestPrice),
                                date: new Date(date),
                        },
                });
                return NextResponse.json(assetValue);
        } catch (error) {
                return NextResponse.error();
        }
}

// DELETE: Delete an asset value by assetValueId
export async function DELETE(request: any) {
        try {
                const { assetValueId } = await request.json();
                const assetValue = await prisma.assetValue.delete({
                        where: { assetValueId: BigInt(assetValueId) },
                });
                return NextResponse.json(assetValue);
        } catch (error) {
                return NextResponse.error();
        }
}