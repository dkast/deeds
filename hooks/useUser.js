import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "@db/index";

const useUser = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  const [currentUser, initialising, authError] = useAuthState(auth);
  const [user, loading, error] = useDocumentDataOnce(
    currentUser
      ? doc(getFirestore(firebaseApp), "users", currentUser?.email)
      : null
  );
  return [user, loading, error];
};

export default useUser;
