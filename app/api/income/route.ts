import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all incomes
export async function GET() {
        try {
                const incomes = await prisma.income.findMany();
                return NextResponse.json(incomes);
        } catch (error) {
                return NextResponse.error();
        }
}

// POST: Create a new income
export async function POST(request: any) {
        try {
                const data = await request.json();
                const income = await prisma.income.create({
                        data: {
                                accountId: BigInt(data.accountId),
                                amount: BigInt(data.amount),
                                date: new Date(data.date),
                        },
                });
                return NextResponse.json(income);
        } catch (error) {
                return NextResponse.error();
        }
}

// PUT: Update an existing income by incomeId
export async function PUT(request: any) {
        try {
                const { incomeId, accountId, amount, date } = await request.json();
                const income = await prisma.income.update({
                        where: { incomeId: BigInt(incomeId) },
                        data: {
                                accountId: BigInt(accountId),
                                amount: BigInt(amount),
                                date: new Date(date),
                        },
                });
                return NextResponse.json(income);
        } catch (error) {
                return NextResponse.error();
        }
}

// DELETE: Delete an income by incomeId
export async function DELETE(request: any) {
        try {
                const { incomeId } = await request.json();
                const income = await prisma.income.delete({
                        where: { incomeId: BigInt(incomeId) },
                });
                return NextResponse.json(income);
        } catch (error) {
                return NextResponse.error();
        }
}