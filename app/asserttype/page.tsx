"use client";

import { useEffect, useState } from "react";
import GenericFormModal from "../components/GenericFormModal";

export default function Page() {
  const [assetTypes, setAssetTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAssetType, setEditAssetType] = useState(null);

  useEffect(() => {
    fetchAssetTypes();
  }, []);

  const fetchAssetTypes = async () => {
    const response = await fetch("/api/asserttype");
    const data = await response.json();
    setAssetTypes(data);
  };

  const handleCreate = () => {
    setEditAssetType(null);
    setIsModalOpen(true);
    fetchAssetTypes();
  };

  const handleEdit = (assetType: any) => {
    setEditAssetType(assetType);
    setIsModalOpen(true);
  };

  const handleDelete = async (assetId: number) => {
    const response = await fetch("/api/asserttype", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assetId }),
    });
    if (response.ok) {
      fetchAssetTypes();
    }
  };

  return (
    <div className="mt-10">
      <div className="container mx-auto  mb-10 flex items-center justify-between">
        <h1 className="text-lg  ">Asset Types</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Asset Type
        </button>
      </div>

      <div className="container mx-auto relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-2">Asset Name</th>
              <th className="px-6 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetTypes.map((assetType: any) => (
              <tr
                key={assetType.assetId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {assetType.name}
                </th>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(assetType.assetId)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editAssetType ? "Edit Asset Type" : "Create Asset Type"}
        fields={[{ label: "Asset Name", name: "name", type: "text" }]}
        initialValues={editAssetType || {}}
        submitUrl="/api/asserttype"
        method={editAssetType ? "PUT" : "POST"}
      />
    </div>
  );
}
