import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { Lock, ArrowRight } from "react-feather";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

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
  const [password, setPassword] = useState("");

  const [values, loading, error] = useCollectionData(
    firebaseApp.firestore().collection("users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const onSelectUser = user => {
    if (!selectedUser) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  const onLogin = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(selectedUser.email, password)
      .then(() => {
        setUser(user);
        router.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", delay: 0.2 }
    },
    hidden: {
      y: 100,
      opacity: 0
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { type: "tween", duration: 0.2 }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <Head title="Selecciona perfil" />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Loader />}
      <AnimateSharedLayout>
        {values && (
          <div className="flex flex-row items-center justify-center space-x-4">
            {!selectedUser &&
              values.map(user => (
                <motion.div
                  className="text-center cursor-pointer"
                  key={user.name}
                  layoutId={user.name}
                  onClick={() => onSelectUser(user)}
                >
                  <Avatar
                    size="lg"
                    imgFile={user.avatar}
                    bgColor={user.color}
                  />
                  <div className="text-indigo-500 font-bold m-4">
                    {user.name}
                  </div>
                </motion.div>
              ))}
            {selectedUser && (
              <motion.div
                className="text-center cursor-pointer"
                key={selectedUser.name}
                layoutId={selectedUser.name}
                onClick={() => onSelectUser(selectedUser)}
              >
                <Avatar
                  size="xl"
                  imgFile={selectedUser.avatar}
                  bgColor={selectedUser.color}
                />
                <div className="text-indigo-500 font-bold m-4">
                  {selectedUser.name}
                </div>
              </motion.div>
            )}
          </div>
        )}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <div className="mt-1 mb-4 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-700">
                  <Lock className="h-4 w-4"></Lock>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full 
              pl-10 sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:placeholder-gray-700"
                  placeholder="Contraseña"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => onLogin()}
              >
                Entrar
                <ArrowRight className="ml-2"></ArrowRight>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

export default SignIn;
