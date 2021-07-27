import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from "react";
import { ChevronDown } from "react-feather";
import { ArrowLeft } from "react-feather";
import Link from "next/link";
import Lottie from "react-lottie";
import { Dialog } from "@headlessui/react";

import { useFirebaseApp } from "../firebase";
import Avatar from "../components/avatar";
import ActivityButton from "../components/activityButton";
import Head from "../components/head";
import Auth from "../components/auth";
import useUser from "../hooks/useUser";
import useModal from "../hooks/useModal";
import Modal from "../components/modal";
import * as animationData from "../public/static/assets/stone.json";
import activites from "../data/activites";

const Compose = () => {
  const firebaseApp = useFirebaseApp();
  const { user, loading, userError } = useUser();
  const signOut = () => {
    firebaseApp.auth().signOut();
  };
  const { isShowing, toggle } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  const activityTapped = actType => {
    let userPoints = user.points;
    if (actType.requireDetails) {
      setIsOpen(true);
    }
    // firebaseApp
    //   .firestore()
    //   .collection("deeds")
    //   .add({
    //     actType: actType.id,
    //     timestamp: new Date(),
    //     points: actType.points,
    //     userRef: firebaseApp.firestore().doc(`users/${user.email}`)
    //   })
    //   .then(ref => {
    //     firebaseApp
    //       .firestore()
    //       .doc(`users/${user.email}`)
    //       .update({
    //         points: userPoints + actType.points
    //       })
    //       .then(() => {
    //         toggle();
    //       })
    //       .catch(error => {
    //         alert("ocurrio un error actualizadon al usuario");
    //       });
    //   })
    //   .catch(error => {
    //     alert("ocurrio un error grabando la actividad");
    //   });
    // toggle();
  };

  return (
    <Auth>
      <div className="h-screen flex flex-col items-center bg-white dark:bg-black">
        <Head title="Agrega una actividad" />
        <Link href="/">
          <a className="self-start p-4 pt-6 -mb-16 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
        <div
          className="mt-3 flex items-center cursor-pointer"
          onClick={() => signOut()}
        >
          {user && <Avatar imgFile={user.avatar} bgColor={user.color} />}
          <div className="-ml-3 pl-3 pr-2 py-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-tr-full rounded-br-full">
            <span className="mx-3 font-bold">{user ? user.name : ""}</span>
            <ChevronDown className="inline-block" />
          </div>
        </div>
        <div className="my-8">
          <span className="text-indigo-600 text-2xl font-bold">
            ¿Qué tarea completaste?
          </span>
        </div>
        <div className="grid grid-cols-2">
          {activites.map(act => (
            <ActivityButton
              key={act.id}
              icon={act.icon}
              text={act.description}
              points={act.points}
              onClick={() => activityTapped(act)}
            ></ActivityButton>
          ))}
        </div>
      </div>
      <Modal isShowing={isShowing} hide={toggle}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData.default,
            rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
          }}
          width={300}
          height={200}
        ></Lottie>
        <h3 className="text-center text-indigo-600 dark:text-indigo-500 text-2xl font-bold my-2">
          ¡Bien hecho!
        </h3>
        <div className="text-center mb-4 dark:text-gray-400">
          Sigue realizando tareas para acumular más puntos
        </div>
        <Link href="/">
          <a className="bg-gradient-to-br from-indigo-600 to-purple-600 active:bg-indigo-800 text-white text-center block w-full px-4 py-2 rounded">
            Listo
          </a>
        </Link>
      </Modal>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Title>Deberes</Dialog.Title>
          <Dialog.Description>Dinos un poco más</Dialog.Description>
          <textarea
            id="about"
            name="about"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            defaultValue={""}
          />
        </div>
      </Dialog>
    </Auth>
  );
};

export default Compose;
