import { Fragment, useState } from "react";
import { collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { MoreVertical } from "react-feather";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import Loader from "@components/loader";
import Avatar from "@components/avatar";
import { useFirebaseApp } from "@db/firebaseApp";

const Family = () => {
  const firebaseApp = useFirebaseApp();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [data, loading, error] = useCollectionData(
    collection(getFirestore(firebaseApp), "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const variants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: { ease: "anticipate", delay: 0.3 }
    },
    hidden: {
      scale: 0.95,
      opacity: 0
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { ease: "easeOut", duration: 0.2 }
    }
  };

  const onMenuTap = () => {
    setOpen(true);
  };

  const onSubmit = data => {
    setOpen(false);
    console.log("submit");
  };

  return (
    <Auth>
      <div className="flex h-screen flex-col">
        <Head title="Familia" />
        <NavBar title="Familia" />
        <Container>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <Loader />}
          {data && (
            <div className="m-4 flex flex-col space-y-4">
              {data.map(user => (
                <Menu as="div" key={user.name}>
                  <div className="flex flex-row items-center rounded-lg border border-gray-300 p-2 shadow-md shadow-indigo-50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-indigo-800/10">
                    <Avatar
                      size="lg"
                      imgFile={user.avatar}
                      bgColor={user.color}
                    />
                    <div className="ml-4 flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-indigo-500">
                        {user.name}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {user.points} puntos
                      </span>
                    </div>
                    <Menu.Button className="flex grow justify-end text-gray-500 focus:outline-none dark:text-gray-400">
                      <MoreVertical></MoreVertical>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-4 -mt-3 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:bg-gray-800 dark:ring-gray-700">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900 dark:text-gray-400"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              onClick={() => onMenuTap()}
                            >
                              Agregar puntos
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900 dark:text-gray-400"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              onClick={() => onMenuTap()}
                            >
                              Restar puntos
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ))}
            </div>
          )}
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <Dialog
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            static
            as={motion.div}
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 z-40 overflow-y-auto"
          >
            <div className="flex min-h-screen flex-col items-center justify-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <div
                className="z-50 mx-8 inline-block w-5/6 max-w-md overflow-hidden rounded-2xl bg-white p-4 
                text-left align-middle shadow-xl dark:bg-gray-900"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-100"
                >
                  Editar Puntos
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <div className="my-4">
                    <input
                      type="number"
                      placeholder="Puntos"
                      {...register("points", { required: true })}
                      className="block w-full rounded-md border-gray-300 
                          focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 
                          dark:text-white dark:placeholder-gray-700 sm:text-sm"
                    />
                  </div>
                  <div className="flex w-full justify-center">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex self-center rounded-full border border-transparent bg-indigo-600 px-6 
                        py-3 text-center text-base font-medium text-white shadow-md shadow-indigo-400/50 
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                        dark:shadow-indigo-700/50"
                    >
                      Guardar
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </Auth>
  );
};

export default Family;
