import "firebase/auth";
import "firebase/firestore";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { PongSpinner } from "react-spinners-kit";
import { useRouter } from "next/router";

import { useFirebaseApp } from "../firebase";

const Auth = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const [currentUser, initialising, error] = useAuthState(firebaseApp.auth());
  const router = useRouter();

  if (initialising) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PongSpinner color="#6B46C1" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (currentUser) {
    return children;
  } else {
    router.push("/signin");
    return (
      <div className="h-screen flex items-center justify-center">
        <PongSpinner color="#6B46C1" />
      </div>
    );
  }
};

export default Auth;
