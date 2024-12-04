"use client";


import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TransactionItem({ transaction }: { transaction: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async (data :any) => {
    console.log('transaction', data);
    setIsDeleting(true);
    try {
      await fetch("/api/transactions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: data.transactionId,
        }),
      });
      // Optionally, you can refresh the page or update the UI after deletion.
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setIsDeleting(false);
      router.refresh();
    }
  };

  const colDefs = [
    { headerName: "Transaction Type", field: "transactionType",
     },
    { headerName: "Amount", field: "amount" },
    { headerName: "Reason", field: "reason" },
    {
      headerName: "Action",
      cellRenderer: function (params: any) {
        return (
          <button
            onClick={() => handleDelete(
              params.data
            )}
            disabled={isDeleting}
            className="text-red-600 dark:text-red-400"
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 750 }} // the Data Grid will fill the size of the parent container
    >
      {" "}
      <AgGridReact
        gridOptions={{
          defaultColDef: {
            flex: 1,
            minWidth: 150,
            sortable: true,
            filter: true,
          },
        }}
        rowHeight={60}
        rowData={transaction}
        columnDefs={colDefs}
      />
    </div>
  );
}
