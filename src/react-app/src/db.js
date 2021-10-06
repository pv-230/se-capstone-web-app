import { doc, getFirestore, setDoc, addDoc, collection, getDoc } from "firebase/firestore";

// Takes in a userData class and stores it into Firestore
export async function setUserData(uid) {
    if(uid == null) {
        console.log("Error, user is not logged in!");
        return;
    }
    const db = getFirestore();
    const ref = collection(db, 'users');

    // This will be removed, just here for testing
    const compClass = ["COT4420", "COP3363"];
    const outClass = ["CEN4020"];
    const userD = new userData(compClass, outClass);
    await setDoc(doc(ref, uid.toString()), userD.getJSONObject());
    
    // This will also be commented back in after testing
    //await setDoc(doc(ref, uid.toString()), UserData.getJSONObject());
}

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
        let userD = new userData(JSON.parse(snapshot.data().CompletedClasses), JSON.parse(snapshot.data().OutstandingClasses));
        console.log(userD.toString());
        return userD;
    } else {
        console.log("Error reading user data from Firestore!");
    }
}

export class userData {
    constructor(completedClasses, outstandingClasses) {
        this.completedClasses = completedClasses;
        this.outstandingClasses = outstandingClasses;
    }
    toString() {
        return "Completed Classes:\n" + this.completedClasses.toString() + "\nOutstanding Classes:\n" + this.outstandingClasses.toString();
    }
    getOutstanding() {
        return this.outstandingClasses;
    }
    getCompleted() {
        return this.completedClasses;
    }
    getJSONObject() {
        const JSONData = {
            "CompletedClasses":  JSON.stringify(this.completedClasses),
            "OutstandingClasses": JSON.stringify(this.outstandingClasses)
        };
        return JSONData;
    }
}