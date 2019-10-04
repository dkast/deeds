import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { useFirebaseApp } from "../firebase";
import Deed from "../components/deed";
import Loader from "../components/loader";

const Timeline = () => {
  const firebaseApp = useFirebaseApp();

  const [value, loading, error] = useCollection(
    firebaseApp
      .firestore()
      .collection("deeds")
      .orderBy("timestamp", "desc"),
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
          let response = await dataItem.userRef.get();
          dataItem.userData = response.data();
          return dataItem;
        }
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
        {data.items.map(item => {
          console.dir(item);
          return <Deed dataItem={item} key={item.id} />;
        })}
      </>
    );
  }
};

export default Timeline;
