'use client';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";

interface AgGridComponentProps {
  rowData: any[];    // The data to populate the grid
  gridHeight?: string; // Optional height for grid
}

const AgGridComponent: React.FC<AgGridComponentProps> = ({ rowData, gridHeight = "500px" }) => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  useEffect(() => {
    // Automatically generate columns based on the keys in rowData
    if (rowData.length > 0) {
      const dynamicColumns = Object.keys(rowData[0]).map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
        field: key,
      }));
      setColumnDefs(dynamicColumns);
    }
  }, [rowData]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination={true} // Optional: Enables pagination
        paginationPageSize={10} // Optional: Number of rows per page
      />
    </div>
  );
};

export default AgGridComponent;
