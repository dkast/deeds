import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "@db/index";

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = props => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const [currentUser, initialising, error] = useAuthState(auth);
  const [value, loading, docError] = useDocumentDataOnce(
    currentUser
      ? doc(getFirestore(firebaseApp), "users", currentUser?.uid)
      : null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading && !docError && value) {
      // console.dir(value);
      setUser(value);
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
