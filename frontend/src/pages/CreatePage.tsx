import {useState} from "react";

import { IonInput, IonPage, IonText } from "@ionic/react";
import HeaderBar from "../components/HeaderBar";

const CreatePage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <IonPage>
                <HeaderBar />
                <div className="text-xl text-center">
                    Add a new place of interest
                </div>
                <div className="border-2">
                    Add Image
                    <input type="file" />
                </div>

                <IonInput label="Name" placeholder="Enter the name of the POI..."/>
                <IonInput label="Description" placeholder="Enter description..."/>

                <div>
                    Add audio file
                    <input type="file" />
                </div>

                <button type="button">Submit</button>

                
            </IonPage>
        </div>
    )
}

export default CreatePage;