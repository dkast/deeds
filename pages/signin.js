import "firebase/auth";

import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PongSpinner } from "react-spinners-kit";
import { useRouter } from "next/router";

import { useFirebaseApp } from "../firebase";
import Head from "../components/head";
import Avatar from "../components/avatar";

const SignIn = () => {
  const firebaseApp = useFirebaseApp();
  const router = useRouter();

  const [values, loading, error] = useCollectionData(
    firebaseApp.firestore().collection("users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const login = userEmail => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(userEmail, "fortnite")
      .then(() => {
        router.push("/");
      });
  };

  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <Head title="Selecciona perfil" />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <PongSpinner color="#6B46C1" />}
      {values && (
        <React.Fragment>
          {values.map(doc => (
            <div
              className="text-center mx-4 cursor-pointer"
              key={doc.id}
              onClick={() => login(doc.email)}
            >
              <Avatar size="xl" />
              <div className="text-indigo-600 font-bold m-4">{doc.name}</div>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default SignIn;
