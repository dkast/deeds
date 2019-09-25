import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "../firebase";

const useUser = () => {
  const firebaseApp = useFirebaseApp();
  const [currentUser, initialising, authError] = useAuthState(
    firebaseApp.auth()
  );
  const [user, loading, error] = useDocumentDataOnce(
    currentUser
      ? firebaseApp.firestore().doc(`users/${currentUser.email}`)
      : null
  );

  return { user, loading, error };
};

export default useUser;
