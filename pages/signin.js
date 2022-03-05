import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { Lock, ArrowRight, Loader as Spinner } from "react-feather";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { useFirebaseApp } from "@db/index";
import Head from "@components/head";
import Avatar from "@components/avatar";
import Loader from "@components/loader";
import { UserContext } from "../context/userContext";

const SignIn = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [data, loading, error] = useCollectionData(
    collection(getFirestore(firebaseApp), "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const onSelectUser = user => {
    setShowError(false);
    if (!selectedUser) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  const onLogin = () => {
    setSubmitted(true);
    setShowError(false);
    signInWithEmailAndPassword(auth, selectedUser.email, password)
      .then(() => {
        setUser(user);
        setSubmitted(false);
        router.push("/");
      })
      .catch(err => {
        setShowError(true);
        setSubmitted(false);
        console.log(err);
      });
  };

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "anticipate", delay: 0.2 }
    },
    hidden: {
      y: 100,
      opacity: 0
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { ease: "easeOut", duration: 0.2 }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Head title="Selecciona perfil" />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Loader />}
      <LayoutGroup>
        {data && (
          <div className="flex flex-row items-center justify-center space-x-4">
            {!selectedUser &&
              data.map(user => (
                <motion.div
                  className="cursor-pointer text-center"
                  key={user.name}
                  layoutId={user.name}
                  onClick={() => onSelectUser(user)}
                >
                  <Avatar
                    size="lg"
                    imgFile={user.avatar}
                    bgColor={user.color}
                  />
                  <div className="m-4 font-bold text-indigo-500">
                    {user.name}
                  </div>
                </motion.div>
              ))}
            {selectedUser && (
              <motion.div
                className="cursor-pointer text-center"
                key={selectedUser.name}
                layoutId={selectedUser.name}
                onClick={() => onSelectUser(selectedUser)}
              >
                <Avatar
                  size="xl"
                  imgFile={selectedUser.avatar}
                  bgColor={selectedUser.color}
                />
                <div className="m-4 font-bold text-indigo-500">
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
              <div className="relative mt-1 mb-4 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-700">
                  <Lock className="h-4 w-4"></Lock>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-md border-gray-300 
              pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-700 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-md shadow-indigo-400/50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:shadow-indigo-700/50"
                onClick={() => onLogin()}
              >
                Entrar
                {!submitted ? (
                  <ArrowRight className="ml-2"></ArrowRight>
                ) : (
                  <Spinner className="ml-2 animate-spin"></Spinner>
                )}
              </motion.button>
              {showError && (
                <motion.span className="mt-2 text-red-500">
                  Oops! contraseña no es válida
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default SignIn;
