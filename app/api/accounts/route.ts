import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Fetch all accounts
export async function GET() {
  try {
    const accounts = await prisma.accounts.findMany();
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

// POST: Create a new account
export async function POST(request: Request) {
  console.log('Request:', request);
  try {
    const data = await request.json();
    console.log('Data:', data);
    const account = await prisma.accounts.create({ data });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data.accountId) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    // Make sure accountBalance is a number
    const updatedData = {
      ...data,
      accountBalance: Number(data.accountBalance),
    };

    const account = await prisma.accounts.update({
      where: { accountId: updatedData.accountId },
      data: updatedData,
    });

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}


// DELETE: Delete an account
export async function DELETE(request: Request) {
  try {
    const data = await request.json();

    // Check if accountId is provided
    if (!data.accountId) {
      return NextResponse.json({ error: 'accountId is required' }, { status: 400 });
    }

    const account = await prisma.accounts.delete({
      where: { accountId: data.accountId },
    });

    return NextResponse.json(account, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete account' }, { status: 500 });
  }
}