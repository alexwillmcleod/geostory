import { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { postData, postDataTextRes } from '../helpers/apiHelpers';
import QrPopUp from '../components/QrCodePopUp';

const CreatePage = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<File>();
  const [audioFile, setAudioFile] = useState<File>();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false); // State for controlling the pop-up

  useEffect(() => {
    name.length && description.length && audioFile && coverImage
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [name, description, coverImage, audioFile]);

  const submitForm = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append(
      'audio',
      new Blob([audioFile!], { type: audioFile!.type }),
      'audio.mp3'
    );
    formData.append(
      'photo',
      new Blob([coverImage!], { type: coverImage!.type }),
      'photo.jpg'
    );

    const res = await postData(`story`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      auth: {
        username: 'alexwillmcleod@gmail.com',
        password: 'password123',
      },
    });

    setId(res);

    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-auto">
      <div className="text-4xl text-center mb-8 font-bold">Create GeoStory</div>
      <div className="w-full max-w-md px-4 mb-8">
        <div className="border-2 rounded-lg mb-8">
          {coverImage ? (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={URL.createObjectURL(coverImage)}
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
                onChange={(e) => setCoverImage(e.target.files?.[0])}
              />
            </div>
          )}
        </div>
        {coverImage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-8"
            onClick={() => setCoverImage(undefined)}
          >
            Change Image
          </button>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-xl"
          >
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
          <label
            htmlFor="description"
            className="text-xl"
          >
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
          {audioFile ? (
            <div className="flex flex-col items-center">
              <span className="text-lg mb-2">{audioFile.name}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => setAudioFile(undefined)}
              >
                Remove Audio
              </button>
            </div>
          ) : (
            <label
              htmlFor="audioUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FaUpload className="text-3xl mb-2" />
              <span>Add Audio File</span>
            </label>
          )}
          <input
            id="audioUpload"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => setAudioFile(e.target.files?.[0])}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full disabled:opacity-50"
            onClick={submitForm}
            disabled={buttonDisabled}
          >
            Submit
          </button>
        </div>
      </div>
      {showPopUp && (
        <QrPopUp
          onClose={handleClosePopUp}
          data={id}
          onBack={() => {}}
        />
      )}
    </div>
  );
};

export default CreatePage;
