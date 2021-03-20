const { useCollectionOnce } = require("react-firebase-hooks/firestore");
const { useFirebaseApp } = require("../firebase");

import Loader from "../components/loader";
import AwardItem from "./awardItem";

const AwardList = () => {
  const firebaseApp = useFirebaseApp();

  const [value, loading, error] = useCollectionOnce(
    firebaseApp.firestore().collection("awards"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  return (
    <div className="space-y-4">
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {loading && <Loader />}
      {value &&
        value.docs.map(doc => (
          <AwardItem key={doc.id} dataItem={doc.data()}></AwardItem>
        ))}
    </div>
  );
};

export default AwardList;
