import { prisma } from '@/lib/prisma'; // Update with your prisma import path
import { getAuth } from '@clerk/nextjs/server'; // Update with your auth provider
import { NextResponse } from 'next/server';

export async function POST(request: any) {
        console.log('POST request', request);
        try {
                const { userId } = getAuth(request);
                console.log('userId', userId);
                if (!userId) {
                        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }

                const data = await request.json();
                console.log('data', data);
                const { transactionType, transactionAmount, reason, transactionDate } = data;

                const accountId = data.account;

                // Validate input
                if (!accountId || !transactionType || !transactionAmount) {
                        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
                }

                const amount = parseFloat(transactionAmount);

                if (isNaN(amount) || amount <= 0) {
                        return NextResponse.json({ error: 'Invalid transaction amount' }, { status: 400 });
                }

                // Start transaction
                const result = await prisma.$transaction(async (prisma) => {
                        // Create the transaction
                        const newTransaction = await prisma.transaction.create({
                                data: {
                                        accountId,
                                        userId,
                                        amount,
                                        transactionType,
                                        reason,
                                        date: new Date(transactionDate)
                                },
                        });

                        // Adjust account balance
                        const account = await prisma.accounts.findUnique({
                                where: {
                                        accountId
                                }
                        });
                        if (!account) {
                                throw new Error('Account not found');
                        }

                        const newBalance =
                                transactionType === 'CREDIT'
                                        ? account.accountBalance + amount
                                        : account.accountBalance - amount;

                        if (newBalance < 0) {
                                throw new Error('Insufficient balance for this transaction');
                        }

                        await prisma.accounts.update({
                                where: { accountId },
                                data: { accountBalance: newBalance },
                        });

                        return newTransaction;
                });

                return NextResponse.json(result, { status: 201 });
        } catch (error: any) {
                console.error('Error creating transaction:', error);
                return NextResponse.json({ error: error.message || 'Failed to create transaction' }, { status: 500 });
        }
}

export async function GET(request: any) {
        try {
                const { userId } = getAuth(request);
                if (!userId) {
                        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }

                const transactions = await prisma.transaction.findMany({
                        where: { userId },
                        include: { account: true },
                });

                return NextResponse.json(transactions, { status: 200 });
        } catch (error) {
                console.error('Error fetching transactions:', error);
                return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
        }
}

export async function DELETE(request: any) {
        console.log('DELETE request', request);
        try {
                const { userId } = getAuth(request);
                if (!userId) {
                        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }

                const { transactionId } = await request.json();
                console.log('transactionId', transactionId);

                // Validate input
                if (!transactionId) {
                        return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
                }

                // Start transaction
                const result = await prisma.$transaction(async (prisma) => {
                        // Fetch the transaction details
                        const transaction = await prisma.transaction.findUnique({
                                where: { transactionId },
                        });

                        if (!transaction) {
                                throw new Error('Transaction not found');
                        }

                        if (transaction.userId !== userId) {
                                throw new Error('Unauthorized: Cannot delete this transaction');
                        }

                        // Fetch the associated account
                        const account = await prisma.accounts.findUnique({
                                where: { accountId: transaction.accountId },
                        });

                        if (!account) {
                                throw new Error('Associated account not found');
                        }

                        // Calculate the adjusted balance
                        const adjustedBalance =
                                transaction.transactionType === 'CREDIT'
                                        ? account.accountBalance - transaction.amount
                                        : account.accountBalance + transaction.amount;

                        // Ensure the adjusted balance is not negative
                        if (adjustedBalance < 0) {
                                throw new Error(
                                        'Cannot delete transaction because it would result in a negative account balance'
                                );
                        }

                        // Update account balance
                        await prisma.accounts.update({
                                where: { accountId: transaction.accountId },
                                data: { accountBalance: adjustedBalance },
                        });

                        // Delete the transaction
                        await prisma.transaction.delete({
                                where: { transactionId },
                        });

                        return { message: 'Transaction deleted successfully' };
                });

                return NextResponse.json(result, { status: 200 });
        } catch (error: any) {
                console.error('Error deleting transaction:', error);

                const errorMessage =
                        error.message === 'Transaction not found' ||
                                error.message === 'Unauthorized: Cannot delete this transaction' ||
                                error.message === 'Associated account not found'
                                ? error.message
                                : 'Failed to delete transaction';

                return NextResponse.json({ error: errorMessage }, { status: 500 });
        }
}

