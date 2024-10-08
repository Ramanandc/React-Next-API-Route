import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// GET: Fetch all asset types
export async function GET() {
        try {
                const assetTypes = await prisma.assetType.findMany();
                return NextResponse.json(assetTypes);
        } catch (error) {
                return NextResponse.error();
        }
}

export async function POST(request: any) {
        try {
                const data = await request.json();
                console.log('Data:', data);
                // Only pass 'name', Prisma will auto-generate 'assetId'
                const assetType = await prisma.assetType.create({
                        data: {
                                name: data.name,
                                assetId: uuidv4(),
                        },
                });

                return NextResponse.json(assetType, { status: 201 });
        } catch (error) {
                console.error('Error creating asset type:', error);
                return NextResponse.json({ error: 'Failed to create asset type' }, { status: 500 });
        }
}

export async function PUT(request: any) {
        try {
                const { assetId, name } = await request.json();
                const assetType = await prisma.assetType.update({
                        where: { assetId: assetId },
                        data: { name },
                });
                return NextResponse.json(assetType);
        } catch (error) {
                return NextResponse.error();
        }
}

// DELETE: Delete an asset type by assetId
export async function DELETE(request: any) {
        try {
                const { assetId } = await request.json();
                const assetType = await prisma.assetType.delete({
                        where: { assetId: assetId },
                });
                return NextResponse.json(assetType);
        } catch (error) {
                return NextResponse.error();
        }
}