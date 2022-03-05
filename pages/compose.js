import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  doc,
  updateDoc,
  collection,
  increment
} from "firebase/firestore";
import React, { useState } from "react";
import { ChevronDown, ArrowLeft } from "react-feather";
import Link from "next/link";
import Lottie from "react-lottie";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

import { useFirebaseApp } from "@db/index";
import Avatar from "@components/avatar";
import ActivityButton from "@components/activityButton";
import Head from "@components/head";
import Auth from "@components/auth";
import useUser from "@hooks/useUser";
import useModal from "@hooks/useModal";
import Modal from "@components/modal";
import * as animationData from "../public/static/assets/stone.json";
import activites from "../data/activites";

const Compose = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const [user, loading, userError] = useUser();
  const [isShowing, toggle] = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [activity, setActivity] = useState(null);
  const MotionActivityButton = motion(ActivityButton);

  const logOut = () => {
    signOut(auth);
  };

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

  const list = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1
    }
  };

  const onActivityTap = actType => {
    let userPoints = user.points;
    if (actType.requireComments && comment.length === 0) {
      setIsOpen(true);
      setActivity(actType);
    } else {
      setIsOpen(false);
      addDoc(collection(getFirestore(firebaseApp), "deeds"), {
        actType: actType.id,
        timestamp: new Date(),
        points: actType.points,
        userRef: doc(getFirestore(firebaseApp), "users", user.email),
        comment: comment
      })
        .then(() => {
          updateDoc(doc(getFirestore(firebaseApp), "users", user?.email), {
            points: increment(actType.points)
          })
            .then(() => {
              setComment("");
              toggle();
            })
            .catch(error => {
              alert("Ocurrio un error actualizadon al usuario");
            });
        })
        .catch(error => {
          alert("Ocurrio un error grabando la actividad");
        });
    }
  };

  const onCloseComments = () => {
    setIsOpen(false);
    setComment("");
  };

  return (
    <Auth>
      <div className="flex h-screen flex-col items-center bg-white dark:bg-black">
        <Head title="Agrega una actividad" />
        <Link href="/">
          <a className="-mb-16 self-start p-4 pt-6 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
        <div
          className="mt-3 flex cursor-pointer items-center"
          onClick={() => logOut()}
        >
          {user && <Avatar imgFile={user.avatar} bgColor={user.color} />}
          <div className="-ml-3 rounded-tr-full rounded-br-full bg-gray-200 py-2 pl-3 pr-2 dark:bg-gray-800 dark:text-gray-300">
            <span className="mx-3 font-bold">{user ? user.name : ""}</span>
            <ChevronDown className="inline-block" />
          </div>
        </div>
        <div className="my-8">
          <span className="text-2xl font-bold text-indigo-600">
            ¿Qué tarea completaste?
          </span>
        </div>
        <motion.ul
          variants={list}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2"
        >
          {activites.map(act => (
            <motion.li variants={item} key={act.id} whileTap={{ scale: 0.95 }}>
              <ActivityButton
                icon={act.icon}
                text={act.description}
                points={act.points}
                onClick={() => onActivityTap(act)}
              ></ActivityButton>
            </motion.li>
          ))}
        </motion.ul>
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
        <h3 className="my-2 text-center text-2xl font-bold text-indigo-600 dark:text-indigo-500">
          ¡Bien hecho!
        </h3>
        <div className="mb-4 text-center dark:text-gray-400">
          Sigue realizando tareas para acumular más puntos
        </div>
        <Link href="/">
          <a className="block w-full rounded bg-gradient-to-br from-indigo-600 to-purple-600 px-4 py-2 text-center text-white active:bg-indigo-800">
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
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="flex min-h-screen flex-col items-center justify-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <div
                className="z-30 mx-8 inline-block w-5/6 max-w-md overflow-hidden rounded-2xl bg-white px-4 py-4 
              text-left align-middle shadow-xl dark:bg-gray-900"
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
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-700 sm:text-sm"
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    disabled={comment.length === 0}
                    className="mt-3 self-center rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
