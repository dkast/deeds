import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { Lock } from "react-feather";

import { useFirebaseApp } from "../firebase";
import Head from "../components/head";
import Avatar from "../components/avatar";
import Loader from "../components/loader";
import { UserContext } from "../context/userContext";

const SignIn = () => {
  const firebaseApp = useFirebaseApp();
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const [values, loading, error] = useCollectionData(
    firebaseApp.firestore().collection("users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const login = user => {
    // firebaseApp
    //   .auth()
    //   .signInWithEmailAndPassword(user.email, "fortnite")
    //   .then(() => {
    //     setUser(user);
    //     router.push("/");
    //   });

    if (!selectedUser) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <Head title="Selecciona perfil" />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Loader />}
      {values && (
        <div className="flex flex-row items-center justify-center space-x-2">
          {!selectedUser &&
            values.map(user => (
              <div
                className="text-center cursor-pointer"
                key={user.name}
                onClick={() => login(user)}
              >
                <Avatar size="xl" imgFile={user.avatar} bgColor={user.color} />
                <div className="text-indigo-500 font-bold m-4">{user.name}</div>
              </div>
            ))}
          {selectedUser && (
            <div
              className="text-center cursor-pointer"
              key={selectedUser.name}
              onClick={() => login(selectedUser)}
            >
              <Avatar
                size="xl"
                imgFile={selectedUser.avatar}
                bgColor={selectedUser.color}
              />
              <div className="text-indigo-500 font-bold m-4">
                {selectedUser.name}
              </div>
            </div>
          )}
        </div>
      )}
      {selectedUser && (
        <>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock></Lock>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="contraseña"
            />
          </div>
          <button>Entrar</button>
        </>
      )}
    </div>
  );
};

export default SignIn;
