"use client";

import { useState } from "react";
import GenericFormModal from "../components/GenericFormModal";

const EditAccount = ({ account }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accountFields = [
    { label: "Account Name", name: "accountName", type: "text" },
    { label: "Account Number", name: "accountNo", type: "text" },
    { label: "IFSC Code", name: "accountIfccode", type: "text" },
    { label: "Account Branch", name: "accountBranch", type: "text" },
    { label: "Account Balance", name: "accountBalance", type: "number" },
    { label: "Account Holder", name: "accountHolder", type: "select" },
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
      >
        Edit Account
      </button>

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Account"
        fields={accountFields}
        initialValues={account}
        submitUrl={`/api/accounts/${account.accountId}`}
        method="PUT"
      />
    </div>
  );
};

export default EditAccount;
