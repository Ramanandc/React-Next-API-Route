import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// GET: Fetch all accounts
export async function GET(request : any ) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const accounts = await prisma.accounts.findMany(
      {
        where: { userId },
        orderBy: { accountName: 'asc' },
      }
    );
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

// POST: Create a new account
export async function POST(request: any) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    data.accountHolder = parseInt(data.accountHolder);
    data.accountBalance = parseFloat(data.accountBalance);
    const newAccount = await prisma.accounts.create({
      data: {
        ...data,
        userId,
      },
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
  
}

// PUT: Update an account
export async function PUT(request: any) {
  try {
    
    const data = await request.json();
    
    if (!data.accountId) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    const updatedAccount = await prisma.accounts.update({
      where: { accountId: data.accountId },
      data: {
        ...data,
        accountBalance: parseFloat(data.accountBalance),
      },
    });

    return NextResponse.json(updatedAccount, { status: 200 });
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

// DELETE: Delete an account
export async function DELETE(request: Request) {
  try {
    const data = await request.json();

    if (!data.accountId) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    const deletedAccount = await prisma.accounts.delete({
      where: { accountId: data.accountId },
    });

    return NextResponse.json(deletedAccount, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete account' }, { status: 500 });
  }
}
