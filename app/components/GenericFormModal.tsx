"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../components/modal";

interface Field {
  label: string;
  name: string;
  type: string; // 'text', 'number', 'select', etc.
  options?: { label: string; value: string | number }[]; // For select fields
}

interface GenericFormModalProps {
  fields: Field[];
  initialValues?: Record<string, any>;
  title: string;
  submitUrl: string;
  method: "POST" | "PUT";
  onClose: () => void;
  isOpen: boolean;
}

const GenericFormModal: React.FC<GenericFormModalProps> = ({
  fields,
  initialValues = {},
  title,
  submitUrl,
  method,
  onClose,
  isOpen,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [holders, setHolders] = useState<{ label: string; value: string }[]>([]);
  const [accounts, setAccounts] = useState<{ label: string; value: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHoldersAndAccounts = async () => {
      try {
        const [holdersResponse, accountsResponse] = await Promise.all([
          fetch("/api/holders"),
          fetch("/api/accounts"),
        ]);
        if (holdersResponse.ok && accountsResponse.ok) {
          const holdersData = await holdersResponse.json();
          const accountsData = await accountsResponse.json();

          const holderOptions = holdersData.map((holder: { holderId: number; holderName: string }) => ({
            label: holder.holderName,
            value: holder.holderId,
          }));
          setHolders(holderOptions);

          const accountOptions = accountsData.map((account: { accountId: number; accountName: string }) => ({
            label: account.accountName,
            value: account.accountId,
          }));
          setAccounts(accountOptions);
        } else {
          console.error("Failed to fetch holders or accounts");
        }
      } catch (error) {
        console.error("Error fetching holders and accounts:", error);
      }
    };

    fetchHoldersAndAccounts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "accountHolder" || name === "account" ? Number(value) : value, // Parse accountId/accountHolderId as integer
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const response = await fetch(submitUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.refresh();
        onClose();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select {field.label}</option>
                {(field.name === "accountHolder" ? holders : field.name === "account" ? accounts : field.options)?.map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GenericFormModal;
