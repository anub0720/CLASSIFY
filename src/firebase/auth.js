import {auth,db} from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
export const doCreateUserWithEmailAndPassword = async(email, password) =>{
    return createUserWithEmailAndPassword(auth,email,password);
};
export const doSignInWithEmailAndPassword = async(email, password) =>{
    return signInWithEmailAndPassword(auth,email,password);
};
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
      });
  
      return result;
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      throw error;
    }
  };
export const doSignOut = async () =>{
    return auth.signOut();
};
// export const doPasswordReset = async(email) =>{
//     return sendPasswordResetEmail(auth,email);
// };
// export const doPasswordUpdate = async(password) =>{
//     return updatePassword(auth.currentUser,password);
// };
export const doSendEmailVerification = async() =>{
    // return sendEmailVerification(auth.currentUser,{
    //     url:`${window.location.origin}/home`,
    // });
    console.log("Email verification sent");
};
// export const doDeleteUser = async() =>{
//     return auth.currentUser.delete();
// };