import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Handle GET, PUT, DELETE for a single account by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const accountId = parseInt(params.id, 10); // extract accountId from the URL

  try {
    const data = await req.json();

    const updatedAccount = await prisma.accounts.update({
      where: { accountId },
      data: {
        accountName: data.accountName,
        accountNo: data.accountNo,
        accountIfccode: data.accountIfccode,
        accountBranch: data.accountBranch,
        accountBalance: Number(data.accountBalance),
      },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json({ error: "Account not found or update failed" }, { status: 404 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const accountId = parseInt(params.id, 10);

  try {
    const account = await prisma.accounts.findUnique({
      where: { accountId },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    return NextResponse.json({ error: "Error fetching account" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const accountId = parseInt(params.id, 10);

  try {
    const deletedAccount = await prisma.accounts.delete({
      where: { accountId },
    });

    return NextResponse.json(deletedAccount);
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ error: "Error deleting account" }, { status: 404 });
  }
}
