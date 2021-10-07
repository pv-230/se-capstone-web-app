import { doc, getFirestore, setDoc, collection } from "firebase/firestore";
import { UserData } from "../models/UserData";

// Takes in a userData class and stores it into Firestore
export async function setUserData(userData) {
    const uid = localStorage.getItem("userId");
    if(uid == null) {
        console.log("Error, user is not logged in!");
        return;
    }
    const db = getFirestore();
    const ref = collection(db, 'users');

    // This will be removed, just here for testing
    const compClass = ["COT4420", "COP3363"];
    const outClass = ["CEN4020", "CDA3100"];
    const userD = new UserData("John", "Doe", "test@gmail.com", compClass, outClass);
    //userD.completeClass("CDA3100");
    await setDoc(doc(ref, uid.toString()), userD.getJSONObject());
    
    // This will also be commented back in after testing
    //await setDoc(doc(ref, uid.toString()), userData.getJSONObject());
}