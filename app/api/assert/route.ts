import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all assets
export async function GET() {
        try {
                const assets = await prisma.asset.findMany();
                return NextResponse.json(assets);
        } catch (error) {
                return NextResponse.error();
        }
}

// POST: Create a new asset
export async function POST(request: any) {
        try {
                const data = await request.json();
                const asset = await prisma.asset.create({
                        data: {
                                assetId: BigInt(data.assetId),
                                quantity: BigInt(data.quantity),
                                date: new Date(data.date),
                                price: BigInt(data.price),
                        },
                });
                return NextResponse.json(asset);
        } catch (error) {
                return NextResponse.error();
        }
}


// PUT: Update an existing asset by id
export async function PUT(request: any) {
        try {
                const { id, assetId, quantity, date, price } = await request.json();
                const asset = await prisma.asset.update({
                        where: { id: BigInt(id) },
                        data: {
                                assetId: BigInt(assetId),
                                quantity: BigInt(quantity),
                                date: new Date(date),
                                price: BigInt(price),
                        },
                });
                return NextResponse.json(asset);
        } catch (error) {
                return NextResponse.error();
        }
}

// DELETE: Delete an asset by id
export async function DELETE(request: any) {
        try {
                const { id } = await request.json();
                const asset = await prisma.asset.delete({
                        where: { id: BigInt(id) },
                });
                return NextResponse.json(asset);
        } catch (error) {
                return NextResponse.error();
        }
}