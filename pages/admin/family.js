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
            <div className="flex flex-col space-y-2">
              {data.map(user => (
                <div key={user.name}>
                  <Avatar
                    size="lg"
                    imgFile={user.avatar}
                    bgColor={user.color}
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    {user.name}
                  </span>
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
