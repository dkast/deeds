import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from "react";
import { ChevronDown, ArrowLeft } from "react-feather";
import Link from "next/link";
import Lottie from "react-lottie";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [comment, setComment] = useState("");
  const [activity, setActivity] = useState(null);

  const variants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: { ease: "anticipate", delay: 0.2 }
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

  const onActivityTap = actType => {
    let userPoints = user.points;
    if (actType.requireComments && comment.length === 0) {
      setIsOpen(true);
      setActivity(actType);
    } else {
      setIsOpen(false);
      firebaseApp
        .firestore()
        .collection("deeds")
        .add({
          actType: actType.id,
          timestamp: new Date(),
          points: actType.points,
          userRef: firebaseApp.firestore().doc(`users/${user.email}`),
          comment: comment
        })
        .then(ref => {
          firebaseApp
            .firestore()
            .doc(`users/${user.email}`)
            .update({
              points: userPoints + actType.points
            })
            .then(() => {
              setComment("");
              toggle();
            })
            .catch(error => {
              alert("ocurrio un error actualizadon al usuario");
            });
        })
        .catch(error => {
          alert("ocurrio un error grabando la actividad");
        });
    }
  };

  const onCloseComments = () => {
    setIsOpen(false);
    setComment("");
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
              onClick={() => onActivityTap(act)}
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

      <AnimatePresence>
        {isOpen && (
          <Dialog
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            static
            as={motion.div}
            open={isOpen}
            onClose={() => onCloseComments()}
            className="fixed z-10 inset-0 overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-screen">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <div
                className="inline-block w-5/6 max-w-md px-4 py-4 mx-8 overflow-hidden text-left align-middle z-30 
              bg-white dark:bg-gray-900 shadow-xl rounded-2xl"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-100"
                >
                  ¡Muy bien!
                </Dialog.Title>
                <Dialog.Description className="my-4 text-gray-700 dark:text-gray-400">
                  Dinos un poco más de lo que hiciste
                </Dialog.Description>
                <div className="flex flex-col gap-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:placeholder-gray-700"
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    disabled={comment.length === 0}
                    className="text-center self-center mt-3 px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => onActivityTap(activity)}
                  >
                    Aceptar
                  </motion.button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </Auth>
  );
};

export default Compose;
