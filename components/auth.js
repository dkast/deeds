import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import { useFirebaseApp } from "@db/index";
import Loader from "@components/loader";

const Auth = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  const [currentUser, initialising, error] = useAuthState(auth);

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
