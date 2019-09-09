import "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "../firebase";
import Deed from "../components/deed";

const Timeline = () => {
  const firebaseApp = useFirebaseApp();
  const [value, loading, error] = useCollection(
    firebaseApp.firestore().collection("deeds"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  return (
    <div>
      <h1>Timeline</h1>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{" "}
            {value.docs.map(doc => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())}, ,{console.dir(doc)}
                <Deed points={doc.points} actType={doc.type} />
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
};

export default Timeline;
