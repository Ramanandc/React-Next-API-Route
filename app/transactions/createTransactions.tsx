"use client";

import { useState } from "react";
import GenericFormModal from "../components/GenericFormModal";

const CreateTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionFields = [
    { label: "Transaction Amount", name: "transactionAmount", type: "number" },
    { label: "Transaction Type", name: "transactionType", type: "select", options: [
        { label: "Credit", value: "CREDIT" },
        { label: "Debit", value: "DEBIT" }
      ]
    },
    { label: "Reason", name: "reason", type: "text" },

    {
      label: "Account",
      name: "account",
      type: "select",
      options: [
        // Populate dynamically from accounts API in GenericFormModal
      ]
    },
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
      >
        Create Transaction
      </button>

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Transaction"
        fields={transactionFields}
        submitUrl="/api/transactions"
        method="POST"
      />
    </div>
  );
};

export default CreateTransaction;
