import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all expenditures
export async function GET() {
        try {
                const expenditures = await prisma.expenditure.findMany();
                return NextResponse.json(expenditures);
        } catch (error) {
                return NextResponse.error();
        }
}

// POST: Create a new expenditure
export async function POST(request: any) {
        try {
                const data = await request.json();
                const expenditure = await prisma.expenditure.create({
                        data: {
                                accountId: BigInt(data.accountId),
                                reason: data.reason,
                                amount: BigInt(data.amount),
                                date: new Date(data.date),
                        },
                });
                return NextResponse.json(expenditure);
        } catch (error) {
                return NextResponse.error();
        }
}

// PUT: Update an existing expenditure by expenseId
export async function PUT(request: any) {
        try {
                const { expenseId, accountId, reason, amount, date } = await request.json();
                const expenditure = await prisma.expenditure.update({
                        where: { expenseId: BigInt(expenseId) },
                        data: {
                                accountId: BigInt(accountId),
                                reason,
                                amount: BigInt(amount),
                                date: new Date(date),
                        },
                });
                return NextResponse.json(expenditure);
        } catch (error) {
                return NextResponse.error();
        }
}

// DELETE: Delete an expenditure by expenseId
export async function DELETE(request: any) {
        try {
                const { expenseId } = await request.json();
                const expenditure = await prisma.expenditure.delete({
                        where: { expenseId: BigInt(expenseId) },
                });
                return NextResponse.json(expenditure);
        } catch (error) {
                return NextResponse.error();
        }
}