"use client";

import { useState } from "react";
import GenericFormModal from "../components/GenericFormModal";

const CreateIncome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accountFields = [
    { label: "Account", name: "accountId", type: "select" },
    { label: "Account", name: "amount", type: "number" },
    { label: "Date", name: "date", type: "date" },
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Account
      </button>

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Account"
        fields={accountFields}
        submitUrl="/api/accounts"
        method="POST"
      />
    </div>
  );
};

export default CreateIncome;
