"use client";

import { useState } from "react";
import GenericFormModal from "../components/GenericFormModal";

const CreateTransaction = ({ onTransactionCreated }: { onTransactionCreated: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionFields = [
    {
      label: "Account",
      name: "account",
      type: "select",
      options: [
        // Populate dynamically from accounts API in GenericFormModal
      ],
    },
    {
      label: "Transaction Type",
      name: "transactionType",
      type: "select",
      options: [
        { label: "Credit", value: "CREDIT" },
        { label: "Debit", value: "DEBIT" },
      ],
    },
    { label: "Transaction Amount", name: "transactionAmount", type: "number" },
    { label: "Reason", name: "reason", type: "text" },
    { label: "Transaction Date", name: "transactionDate", type: "date" },
  ];

  const handleSubmitSuccess = () => {
    onTransactionCreated(); // Notify parent to refresh transactions
    setIsModalOpen(false); // Close modal after successful submission
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
      >
        Create Transaction
      </button>

      {isModalOpen && (
        <GenericFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Transaction"
          fields={transactionFields}
          submitUrl="/api/transactions"
          method="POST"
          onSubmitSuccess={handleSubmitSuccess} // Pass callback for success handling
        />
      )}
    </div>
  );
};

export default CreateTransaction;
