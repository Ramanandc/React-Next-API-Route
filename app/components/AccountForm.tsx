'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AccountForm() {
  const [formData, setFormData] = useState({
    accountName: '',
    accountNo: '',
    accountIfccode: '',
    accountBranch: '',
    accountBalance: '',
  });
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

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          accountBalance: Number(formData.accountBalance),
        }),
      });
      if (response.ok) {
        router.refresh();
      } else {
        console.error('Failed to create account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="accountName" className="form-label">Account Name</label>
        <input
          type="text"
          className="form-control"
          id="accountName"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="accountNo" className="form-label">Account No</label>
        <input
          type="number"
          className="form-control"
          id="accountNo"
          name="accountNo"
          value={formData.accountNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="accountIfccode" className="form-label">IFSC Code</label>
        <input
          type="text"
          className="form-control"
          id="accountIfccode"
          name="accountIfccode"
          value={formData.accountIfccode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="accountBranch" className="form-label">Branch</label>
        <input
          type="text"
          className="form-control"
          id="accountBranch"
          name="accountBranch"
          value={formData.accountBranch}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="accountBalance" className="form-label">Balance</label>
        <input
          type="number"
          className="form-control"
          id="accountBalance"
          name="accountBalance"
          value={formData.accountBalance}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Account</button>
    </form>
  );
}
