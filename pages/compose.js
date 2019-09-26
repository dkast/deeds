import "firebase/auth";
import "firebase/firestore";
import React, { useContext } from "react";
import { ChevronDown } from "react-feather";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

import { useFirebaseApp } from "../firebase";
import Avatar from "../components/avatar";
import ActivityButton from "../components/activityButton";
import Head from "../components/head";
import Auth from "../components/auth";
import useUser from "../hooks/useUser";

const Compose = () => {
  const firebaseApp = useFirebaseApp();
  const { user, loading, userError } = useUser();
  const signOut = () => {
    firebaseApp.auth().signOut();
  };

  const activityTapped = actType => {
    let points = 0;
    let userPoints = user.points;
    switch (actType) {
      case "activity_tbrush":
        points = 10;
        break;
      case "activity_bath":
        points = 30;
        break;
      case "activity_homework":
        points = 50;
        break;
      case "activity_help":
        points = 20;
        break;
      default:
        break;
    }
    firebaseApp
      .firestore()
      .collection("deeds")
      .add({
        actType: actType,
        timestamp: new Date(),
        points: points,
        userRef: firebaseApp.firestore().doc(`users/${user.email}`)
      })
      .then(ref => {
        firebaseApp
          .firestore()
          .doc(`users/${user.email}`)
          .update({
            points: userPoints + points
          })
          .then(() => {
            alert("documento actualizado");
          })
          .catch(error => {
            alert("ocurrio un error actualizadon al usuario");
          });
      })
      .catch(error => {
        alert("ocurrio un error grabando la actividad");
      });
  };

  return (
    <Auth>
      <div className="h-screen flex flex-col items-center">
        <Head title="Agrega una actividad" />
        <Link href="/">
          <a className="self-start p-4 pt-6 -mb-16 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
        <div
          className="mt-2 flex items-center cursor-pointer"
          onClick={() => signOut()}
        >
          {user && <Avatar imgFile={user.avatar} bgColor={user.color} />}
          <div className="-ml-3 pl-3 pr-2 py-2 bg-gray-300 rounded-tr-full rounded-br-full">
            <span className="mx-3 font-bold">{user ? user.name : ""}</span>
            <ChevronDown className="inline-block" />
          </div>
        </div>
        <div className="my-8">
          <span className="text-indigo-600 text-2xl font-bold">
            ¿Que tarea completaste?
          </span>
        </div>
        <div className="flex flex-wrap">
          <ActivityButton
            icon="toothbrush"
            text="Cepillarme los dientes"
            onClick={() => activityTapped("activity_tbrush")}
          />
          <ActivityButton
            icon="bathtub"
            text="Bañarme"
            onClick={() => activityTapped("activity_bath")}
          />
          <ActivityButton
            icon="book"
            text="Hacer la tarea"
            onClick={() => activityTapped("activity_homework")}
          />
          <ActivityButton
            icon="hand"
            text="Ayudar en la casa"
            onClick={() => activityTapped("activity_help")}
          />
        </div>
      </div>
    </Auth>
  );
};

export default Compose;