import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "../firebase";
import Deed from "../components/deed";
import Loader from "../components/loader";

const Timeline = () => {
  const firebaseApp = useFirebaseApp();
  const [values, loading, error] = useCollectionData(
    firebaseApp.firestore().collection("deeds"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Loader />}
      {values && (
        <span>
          {values.map(doc => (
            <React.Fragment key={doc.id}>
              <Deed dataItem={doc} />
            </React.Fragment>
          ))}
        </span>
      )}
    </div>
  );
};

export default Timeline;
