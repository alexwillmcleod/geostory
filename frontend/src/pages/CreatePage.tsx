import { useState } from "react";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="items-center justify-center w-[90%] m-auto pt-2 space-y-8">
      <div className="text-4xl text-center">Add a new place of interest</div>
      <div className="border-2 text-center py-3">
        <span className="text-xl">Add Image </span>
        <input type="file" accept="image/*" />
      </div>

      <div>
        <label htmlFor="name">
          <span className="text-xl">Name </span>
        </label>
        <br />
        <input
          id="name"
          className="border-2 w-full py-2"
          type="text"
          onChange={(e) => setName(String(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="description">
          <span className="text-xl">Description</span>
        </label>
        <br />
        <textarea
          id="description"
          className="border-2 w-full"
          rows={4}
          onChange={(e) => setDescription(String(e.target.value))}
        ></textarea>
      </div>

      <div className="border-2 text-center py-3">
        <span className="text-xl">Add audio file</span> <br />
        <input type="file" accept="audio/*" />
      </div>

      <div className="text-center">
        <button
          type="button"
          className="border-2 w-1/2 rounded-xl m-auto justify-center h-14"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
