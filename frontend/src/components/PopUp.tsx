import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../helpers/apiHelpers";
import { Story } from "../types/story";
import { useNavigate } from "react-router";

interface PopUpProps {
  id: string;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ id, onClose }) => {
  const [story, setStory] = useState({} as Story);
  const navigate = useNavigate();
  // const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      const data = await getData(`story/${id}`);
      setStory(data);
    };

    console.log(id);

    fetchStory();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex items-center justify-center h-40">
          <img
            src={story ? story.photo : ""}
            alt="Image Placeholder"
            className="object-contain h-full"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">{story ? story.name : ""}</h2>
        <p className="text-gray-700 text-sm mt-2">
          {story ? story.description : ""}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            onClose;
            navigate("/listen/" + id);
          }}
        >
          <FontAwesomeIcon icon={faHeadphones} className="mr-2" />
          Listen
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faHeadphones} className="mr-2" />
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
