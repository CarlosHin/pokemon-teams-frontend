import React from 'react';
import { XIcon } from '@heroicons/react/outline';

const Modal = ({ isOpen, onClose, children }) => {
    const overlayClasses = isOpen
        ? 'fixed inset-0 bg-gray-500 opacity-75 transition-opacity'
        : 'hidden';
    const modalClasses = isOpen
        ? 'fixed inset-0 flex items-center justify-center'
        : 'hidden';

    return (
        <>
            <div className={overlayClasses} onClick={onClose}></div>
            <div className={modalClasses}>
                <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                    <button
                        className="absolute right-2 top-2"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <XIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
