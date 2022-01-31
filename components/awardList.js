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
        <div className="flex w-full justify-center">
          <Link href="/prize/edit">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="inline-flex self-center rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-center text-base font-medium text-white shadow-md shadow-indigo-400/50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:shadow-indigo-700/50"
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
