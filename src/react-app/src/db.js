import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { doc, Firestore, getFirestore, setDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
/* eslint-disable */

export let user = null;
export let uid = null;

export const signIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        uid = user.uid;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

// Takes in a map and saves those classes as completed classes in the db for that user
export async function SetCompletedClasses() {
    const db = getFirestore();

    let path = ("users/" + uid.toString() + "/CompletedClasses");
    const ref = collection(db, 'users', uid.toString(), 'Classes');

    const data = {
        1: "one",
        2: "two",
        3: "three"
    };
    await setDoc(doc(ref, "CompletedClasses"), data);
}

// Takes in a map and saves those classes as outstanding classes in the db for that user
export const setOutstandingClasses = (newClasses) => {

}

// Returns a map containing all the user's completed classes
export const getCompletedClasses = () => {

}

// Returns a map containing all the user's outstanding classes
export const getOutstandingClasses = () => {

}