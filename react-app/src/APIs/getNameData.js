import { doc, getFirestore, getDoc } from "firebase/firestore";
import { NameData } from "../models/NameData";

// Returns the userData class from Firebase
export async function getNameData(uid) {
    if(uid == null) {
        console.log("Error, user is not logged in!");
        return;
    }
    const db = getFirestore();
    const ref = doc(db, "users", uid.toString());
    const snapshot = await getDoc(ref);

    if(snapshot.exists()) {
        // Parses the data
        let firstN = JSON.parse(snapshot.data().FirstName);
        let lastN = JSON.parse(snapshot.data().LastName);

        // Creates the new object
        const userD = new NameData(firstN, lastN);
        return userD;
    } else {
        console.log("Error reading name data from Firestore!");
        return null;
    }
}