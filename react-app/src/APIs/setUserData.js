import { doc, getFirestore, setDoc, collection } from "firebase/firestore";

// Takes in a userData class and stores it into Firestore
export async function setUserData(userData, uid) {
    const db = getFirestore();
    const ref = collection(db, 'users');

    // Sends their data to the database
    await setDoc(doc(ref, uid.toString()), userData.getJSONObject());
}