"use client";

import { useState } from "react";
import GenericFormModal from "../components/GenericFormModal";

const CreateAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accountFields = [
    { label: "Account Name", name: "accountName", type: "text" },
    { label: "Account Number", name: "accountNo", type: "text" },
    { label: "IFSC Code", name: "accountIfccode", type: "text" },
    { label: "Account Branch", name: "accountBranch", type: "text" },
    { label: "Account Balance", name: "accountBalance", type: "number" },
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

export default CreateAccount;
