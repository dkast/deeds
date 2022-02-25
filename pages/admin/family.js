import { collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import Loader from "@components/loader";
import Avatar from "@components/avatar";
import { useFirebaseApp } from "@db/firebaseApp";

const Family = () => {
  const firebaseApp = useFirebaseApp();
  const [data, loading, error] = useCollectionData(
    collection(getFirestore(firebaseApp), "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  return (
    <Auth>
      <div className="flex h-screen flex-col">
        <Head title="Familia" />
        <NavBar title="Familia" />
        <Container>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <Loader />}
          {data && (
            <div className="m-4 flex flex-col space-y-4">
              {data.map(user => (
                <div
                  key={user.name}
                  className="flex flex-row items-center rounded-lg border border-gray-100 p-2 shadow shadow-indigo-50"
                >
                  <Avatar
                    size="lg"
                    imgFile={user.avatar}
                    bgColor={user.color}
                  />
                  <div className="ml-4 flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-indigo-500">
                      {user.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {user.points} puntos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </Auth>
  );
};

export default Family;
