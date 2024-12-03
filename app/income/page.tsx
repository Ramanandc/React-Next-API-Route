"use client";

import prisma from "@/lib/prisma";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { BudgetLayout } from "../layouts/layouts";
import CreateIncome from "./createIncome";

async function getIncome() {
  return await prisma.income.findMany();
}

export default async function Page() {
  const incomes = await getIncome();
  return (
    <BudgetLayout>
      <div>
        <div className="container mx-auto  mb-10 flex items-center justify-between">
          <h1 className="text-lg  ">Accounts</h1>
          <CreateIncome />
        </div>
        <div className="container mx-auto relative overflow-x-auto">
          <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact rowData={incomes} />
          </div>
        </div>
      </div>
    </BudgetLayout>
  );
}
