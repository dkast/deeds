const { useCollection } = require("react-firebase-hooks/firestore");
const { useFirebaseApp } = require("../firebase");

import Loader from "../components/loader";

const AwardList = () => {
  const firebaseApp = useFirebaseApp();

  const [value, loading, error] = useCollection(
    firebaseApp.firestore().collection("awards"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  return (
    <>
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {loading && <Loader />}
      {value &&
        value.docs.map(doc => (
          <span className="dark:text-white" key={doc.id}>
            {doc.data().description}
          </span>
        ))}
    </>
  );
};

export default AwardList;
