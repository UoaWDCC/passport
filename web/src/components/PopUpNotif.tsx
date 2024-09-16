import React, { useState } from 'react';

export default function PopUpNotif() {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Button to open the popup */}
            <button 
                onClick={openPopup} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
            >
                Show Notification
            </button>

            {/* Popup Notification */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg text-center space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Notification</h2>
                        <p className="text-gray-600">This is your notification message.</p>
                        <button 
                            onClick={closePopup} 
                            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
