import { doc, getFirestore, setDoc, collection } from "firebase/firestore";
import { UserData } from "../models/UserData";

// Takes in a userData class and stores it into Firestore
export async function setUserData(userData, uid) {
    const db = getFirestore();
    const ref = collection(db, 'users');

    await setDoc(doc(ref, uid.toString()), userData.getJSONObject());
}