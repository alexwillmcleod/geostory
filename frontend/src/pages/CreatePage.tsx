import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { postData } from "../helpers/apiHelpers";
import QrPopUp from "../components/QrCodePopUp";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File>();
  const [audioFile, setAudioFile] = useState<File>();

  const submitForm = () => {
    console.log(audioFile);
    console.log(coverImage);
    console.log(name);
    console.log(description);
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);
  const [selectedAudio, setSelectedAudio] = useState<null | File>(null);
  const [showPopUp, setShowPopUp] = useState(false); // State for controlling the pop-up

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAudio(file);
    }
  };

  const handleSubmit = () => {
    // Perform submission logic here
    // Show the pop-up
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-4xl text-center mb-8 font-bold">Create GeoStory</div>
      <div className="w-full max-w-md px-4 mb-8">
        <form onSubmit={submitForm}>
          <div className="border-2 rounded-lg p-8 mb-8 flex flex-col items-center">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FaUpload className="text-3xl mb-2" />
              <span>Cover Image</span>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="text-xl">
              Story Title
            </label>
            <br />
            <input
              id="name"
              className="border-2 w-full py-2 pl-2"
              type="text"
              onChange={(e) => setName(String(e.target.value))}
            />
          </div>
          <div className="mb-8">
            <label htmlFor="description" className="text-xl">
              Story Description
            </label>
            <br />
            <textarea
              id="description"
              className="border-2 w-full pl-2 py-2"
              rows={4}
              onChange={(e) => setDescription(String(e.target.value))}
            ></textarea>
          </div>
          <div className="border-2 rounded-lg p-8 mb-8 flex flex-col items-center">
            <label
              htmlFor="audioUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FaUpload className="text-3xl mb-2" />
              <span>Add Audio File</span>
            </label>
            <input
              id="audioUpload"
              type="file"
              accept="audio/*"
              className="hidden"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="border-2 rounded-lg mb-8">
          {uploadedImage ? (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={uploadedImage}
              alt="Uploaded Cover"
            />
          ) : (
            <div className="w-full h-32 mb-2 border border-dashed border-gray-400 flex justify-center items-center">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaUpload className="text-3xl mb-2" />
                <span>Upload Image</span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
        {uploadedImage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-8"
            onClick={() => setUploadedImage(null)}
          >
            Change Image
          </button>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="text-xl">
            Story Title
          </label>
          <br />
          <input
            id="name"
            className="border-2 w-full py-2 pl-2"
            type="text"
            onChange={(e) => setName(String(e.target.value))}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="description" className="text-xl">
            Story Description
          </label>
          <br />
          <textarea
            id="description"
            className="border-2 w-full pl-2 py-2"
            rows={2}
            onChange={(e) => setDescription(String(e.target.value))}
          ></textarea>
        </div>
        <div className="border-2 rounded-lg p-8 mb-8 flex flex-col items-center justify-center">
          {selectedAudio ? (
            <div className="flex flex-col items-center">
              <span className="text-lg mb-2">{selectedAudio.name}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => setSelectedAudio(null)}
              >
                Remove Audio
              </button>
            </div>
          ) : (
            <label htmlFor="audioUpload" className="cursor-pointer flex flex-col items-center">
              <FaUpload className="text-3xl mb-2" />
              <span>Add Audio File</span>
            </label>
          )}
          <input
            id="audioUpload"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleAudioUpload}
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {showPopUp && <QrPopUp onClose={handleClosePopUp} data={""} onBack={() => {}} />}
    </div>
  );
};

export default CreatePage;
