import "firebase/auth";
import "firebase/firestore";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import { useFirebaseApp } from "../firebase";
import Loader from "@components/loader";

const Auth = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const [currentUser, initialising, error] = useAuthState(firebaseApp.auth());
  const router = useRouter();

  if (initialising) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
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
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }
};

export default Auth;
