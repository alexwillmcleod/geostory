import React from 'react';

interface PopUpProps {
  data: string;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex items-center justify-center h-40">
          <img
            src="../assets/PlaceholderCoverImage.png" // Replace with your image source
            alt="Image Placeholder"
            className="object-contain h-full"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">The Grass Touched By Backstreet Boys</h2>
        <p className="text-gray-700 text-sm mt-2">Amidst their virtual realm, four secluded students stumbled upon an extraordinary secret hidden within the blades of grass, forever altering their perception of the digital world.</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;