import { Fragment } from "react";
import { collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Menu, Transition } from "@headlessui/react";
import { MoreVertical } from "react-feather";

import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import Loader from "@components/loader";
import Avatar from "@components/avatar";
import { useFirebaseApp } from "@db/firebaseApp";

const Family = () => {
  const firebaseApp = useFirebaseApp();
  const [data, loading, error] = useCollectionData(
    collection(getFirestore(firebaseApp), "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

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
                    <Menu.Items className="absolute right-4 -mt-3 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900 dark:text-gray-400"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Editar puntos
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
    </Auth>
  );
};

export default Family;
