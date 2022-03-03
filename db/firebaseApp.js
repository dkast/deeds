// import firebase from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import * as React from "react";

const FirebaseAppContext = React.createContext(undefined);

export function FirebaseAppProvider(props) {
  const { firebaseConfig } = props;
  let { firebaseApp } = props;
  firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  return <FirebaseAppContext.Provider value={firebaseApp} {...props} />;
}

export function useFirebaseApp() {
  const firebaseApp = React.useContext(FirebaseAppContext);
  if (!firebaseApp) {
    throw new Error(
      "Cannot call useFirebaseApp unless your component is within a FirebaseAppProvider"
    );
  }

  return firebaseApp;
}
