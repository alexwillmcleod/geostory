import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getData } from "../helpers/apiHelpers";
import { Story } from "../types/story";

const ListenPage = () => {
  const url = "http://streaming.tdiradio.com:8000/house.mp3"; // Just a sample URL from the internet

  const navigate = useNavigate();
  const { id } = useParams();

  const [story, setStory] = useState({} as Story);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      const data = await getData(`story/${id}`);
      setStory(data);
    };

    fetchStory();

    // console.log(story);
  }, []);

  useEffect(() => {
    console.log(story);
    console.log(story.audio);
  }, [story]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-64 h-64 bg-blue-400 rounded-lg mb-8 mt-1 flex justify-center items-center">
        <img
          className="max-w-full max-h-full"
          src={story?.photo}
          alt="Cover OKA"
        />
      </div>
      <div className="w-full max-w-md px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-14">{story?.name}</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full mb-8">
          Play
        </button>
        <audio controls className="w-full mb-4">
          <source src={story?.audio} type="audio/mpeg" />
        </audio>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg w-full mt-10">
          Back to Scanner
        </button>
      </div>
    </div>
  );
};

export default ListenPage;
