import sound from "./test2.mp3";

const ListenPage = () => {
  const url = "http://streaming.tdiradio.com:8000/house.mp3"; //Just a sample URL from the internet

  return (
    <div className="border-2 border-red-400 h-full text-center flex-1">
      <div className="h-2/5 border-blue-400 border-2">Cover image</div>
      <div className="border-green-100 border-2 pt-2 space-y-3">
        <span className="text-3xl">Name</span>
        <div>Play</div>
        {/* <div>Back</div> */}
        <audio controls>
          <source src={url} type="audio/mpeg" />
        </audio>
        {/* <ReactAudioPlayer src=tes/> */}
        <button className="border-2 w-1/2 rounded-xl m-auto justify-center h-14">
          Back to Scanner
        </button>
      </div>
    </div>
  );
};

export default ListenPage;
