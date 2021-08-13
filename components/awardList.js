const { useCollectionOnce } = require("react-firebase-hooks/firestore");
const { useFirebaseApp } = require("../firebase");
import { motion } from "framer-motion";
import Link from "next/link";

import Loader from "../components/loader";
import AwardItem from "./awardItem";
import useUser from "../hooks/useUser";

const AwardList = () => {
  const firebaseApp = useFirebaseApp();
  const { user, loadingUser, userError } = useUser();

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
      {user?.role === "parent" && (
        <div className="w-full flex justify-center">
          <Link href="/prize/edit">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="inline-flex text-center self-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Agregar Premio
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AwardList;
