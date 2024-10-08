"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../components/modal";

interface Field {
  label: string;
  name: string;
  type: string;
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataWithNumber = {
      ...formData,
      ...(title === "Create Account" && { accountBalance: parseFloat(formData.accountBalance) }) // Only include accountBalance if the title is "Create Account"
    };
    try {
      const response = await fetch(submitUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithNumber),
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
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required
              className="w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
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
