import { prisma } from '@/lib/prisma'; // Update with your prisma import path
import { getAuth } from '@clerk/nextjs/server'; // Update with your auth provider
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { accountId, transactionType, transactionAmount, reason } = data;

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
        },
      });

      // Adjust account balance
      const account = await prisma.accounts.findUnique({ where: { accountId } });
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