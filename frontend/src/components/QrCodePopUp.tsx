import React, { useEffect, useRef } from 'react';
import { To, useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface PopUpProps {
  data: string;
  onClose: () => void;
  onBack: () => void;
}

const QrPopUp: React.FC<PopUpProps> = ({ onClose, onBack }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigate = (route: To) => {
    navigate(route);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={popupRef} className="bg-white p-8 rounded-lg w-96">
        <div className="flex items-center justify-center h-40">
          <img
            src="QR Code"
            alt="QR CODE GOES HERE"
            className="object-contain h-full"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">Story Title</h2>
        <p className="text-gray-700 text-sm mt-2">
          Story Uploaded Successfully
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => handleNavigate("/landing")}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Scan Page
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Save QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrPopUp;
