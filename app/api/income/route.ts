import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


// GET: Fetch all income details 

export async function GET(request: any) {
        console.log('GET request', request);
        try {
                const { userId } = getAuth(request);
                if (!userId) {
                        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }
                const income = await prisma.income.findMany(
                        {
                                where: { userId },
                                orderBy: { date: 'asc' },
                        }
                );
                return NextResponse.json(income, { status: 200 });
        } catch (error) {
                console.error('Error fetching income:', error);
                return NextResponse.json({ error: 'Failed to fetch income' }, { status: 500 });
        }
}

const updateAccountBalance = async (accountId: number, amount: number) => {
        const account = await prisma.accounts.findUnique({ where: { accountId } });
        if (!account) {
                throw new Error('Account not found');
        }
        const newBalance = account.accountBalance + amount;
        await prisma.accounts.update({
                where: { accountId },
                data: { accountBalance: newBalance },
        });
}

// create a new income and update the account balance on account table amount should be added to the account balance

export async function POST(request: any) {
        try {
                const { userId } = getAuth(request);
                if (!userId) {
                        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }

                const data = await request.json();
                const newIncome = await prisma.income.create({
                        data: { ...data, userId },
                });

                await updateAccountBalance(Number(data.accountId), Number(data.amount));

                return NextResponse.json(newIncome, { status: 201 });
        } catch (error) {
                console.error('Error creating income:', error);
                return NextResponse.json({ error: 'Failed to create income' }, { status: 500 });
        }
}


// PUT: Update an income and update the account balance on account table amount should be added to the account balance

export async function PUT(request: any) {
        try {

                const data = await request.json();

                if (!data.incomeId) {
                        return NextResponse.json({ error: 'Income ID is required' }, { status: 400 });
                }

                const income = await prisma.income.findUnique({ where: { incomeId: data.incomeId } });
                if (!income) {
                        return NextResponse.json({ error: 'Income not found' }, { status: 404 });
                }

                const amountDifference = data.amount - income.amount;
                await updateAccountBalance(Number(data.accountId), Number(amountDifference));

                const updatedIncome = await prisma.income.update({
                        where: { incomeId: data.incomeId },
                        data: {
                                ...data,
                        },
                });

                return NextResponse.json(updatedIncome, { status: 200 });
        } catch (error) {
                console.error('Error updating income:', error);
                return NextResponse.json({ error: 'Income not found or update failed' }, { status: 404 });
        }
}


// DELETE: Delete an income and update the account balance on account table amount should be added to the account balance

export async function DELETE(request: any) {
        try {
                const data = await request.json();

                if (!data.incomeId) {
                        return NextResponse.json({ error: 'Income ID is required' }, { status: 400 });
                }

                const income = await prisma.income.findUnique({ where: { incomeId: data.incomeId } });
                if (!income) {
                        return NextResponse.json({ error: 'Income not found' }, { status: 404 });
                }

                await updateAccountBalance(Number(data.accountId), -Number(income.amount));

                const deletedIncome = await prisma.income.delete({
                        where: { incomeId: data.incomeId },
                });

                return NextResponse.json(deletedIncome, { status: 200 });
        } catch (error) {
                console.error('Error deleting income:', error);
                return NextResponse.json({ error: 'Income not found or delete failed' }, { status: 404 });
        }
}