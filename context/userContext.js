import "firebase/auth";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "../firebase";

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = props => {
  const firebaseApp = useFirebaseApp();
  const [currentUser, initialising, error] = useAuthState(firebaseApp.auth());
  const [value, loading, docError] = useDocumentDataOnce(
    currentUser ? firebaseApp.firestore().doc(`users/${currentUser.uid}`) : null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading && !docError && value) {
      console.dir(value);
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
