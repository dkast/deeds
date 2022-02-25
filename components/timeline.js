import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "@db/index";
import Deed from "@components/deed";
import Loader from "@components/loader";

const Timeline = () => {
  const firebaseApp = useFirebaseApp();
  const [value, loading, error] = useCollectionOnce(
    query(
      collection(getFirestore(firebaseApp), "deeds"),
      orderBy("timestamp", "desc"),
      limit(10)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const [data, setData] = useState({ items: [], isFetching: false });

  useEffect(() => {
    const populateRefs = async () => {
      setData({ items: [], isFetching: true });
      let items = value.docs.map(async doc => {
        let dataItem = doc.data();
        if (dataItem.userRef) {
          let response = await getDoc(dataItem.userRef);
          dataItem.userData = response.data();
        }
        return dataItem;
      });

      const dataItems = await Promise.all(items);
      setData({ items: dataItems, isFetching: false });
    };

    if (value) {
      populateRefs();
    }
  }, [value]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (loading || data.isFetching) {
    return <Loader />;
  }

  if (value && data.items) {
    return (
      <>
        {data.items.map((item, index) => {
          return <Deed dataItem={item} key={index} />;
        })}
      </>
    );
  }
};

export default Timeline;
