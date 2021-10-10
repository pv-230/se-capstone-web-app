import { doc, getFirestore, getDoc } from "firebase/firestore";
import { UserData } from "../models/UserData";

// Returns the userData class from Firebase
export async function getUserData(uid) {
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
        let email = JSON.parse(snapshot.data().Email);
        let comp = JSON.parse(snapshot.data().CompletedClasses);
        let outstanding = JSON.parse(snapshot.data().OutstandingClasses);

        // Creates the new object
        const userD = new UserData(firstN, lastN, email, comp, outstanding);
        return userD;
    } else {
        console.log("Error reading user data from Firestore!");
        return null;
    }
}