import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttonChildren?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, buttonChildren }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Modal Title */}
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        )}

        {/* Modal Content */}
        <div className="modal-content">{children}</div>

        {/* Modal Footer (optional) */}
        <div className="mt-4 flex justify-between space-x-2">
                { buttonChildren }
        </div>
      </div>
    </div>
  );
};

export default Modal;
