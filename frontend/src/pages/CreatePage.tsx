import { useState } from "react";

import { IonInput, IonPage, IonText, IonTextarea } from "@ionic/react";
import HeaderBar from "../components/HeaderBar";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <HeaderBar />
      <div className="border-2 space-y-10">
        <div className="text-xl text-center">Add a new place of interest</div>
        <div className="border-2">
          Add Image <br />
          <input type="file" />
        </div>

        <div>
          <label htmlFor="name">Name </label>
          <br />
          <input
            id="name"
            className="border-2"
            type="text"
            onChange={(e) => setName(String(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="description">Description </label>
          <br />
          <input
            id="description"
            className="border-2 w-full"
            type="text"
            onChange={(e) => setDescription(String(e.target.value))}
          />
        </div>

        <div className="border-2">
          Add audio file <br />
          <input type="file" />
        </div>

        <div className="m-auto w-1/2 border-2">
          <button type="button" className="border-2 w-full">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
