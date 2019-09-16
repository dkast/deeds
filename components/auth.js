import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { PongSpinner } from "react-spinners-kit";
import { useRouter } from "next/router";

import { useFirebaseApp } from "../firebase";

const Auth = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const [user, initialising, error] = useAuthState(firebaseApp.auth());
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

  if (user) {
    return children;
  } else {
    router.push("/signin");
  }
};

export default Auth;
