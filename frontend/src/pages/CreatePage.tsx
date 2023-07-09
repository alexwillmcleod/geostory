import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { postData } from "../helpers/apiHelpers";

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
      </div>
    </div>
  );
};

export default CreatePage;
