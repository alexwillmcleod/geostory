import { useState } from "react";
import { FaUpload } from "react-icons/fa";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<null | string>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-4xl text-center mb-8 font-bold">Create GeoStory</div>
      <div className="w-full max-w-md px-4 mb-8">
        <div className="border-2 rounded-lg p-8 mb-8 flex flex-col items-center">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex flex-col items-center w-full"
          >
            <div className="w-full h-24 mb-2 relative">
              {uploadedImage ? (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={uploadedImage}
                  alt="Uploaded Cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaUpload className="text-3xl" />
                </div>
              )}
            </div>
            <span>{uploadedImage ? "Change Image" : "Cover Image"}</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
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
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;