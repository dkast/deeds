import { ChevronDown } from "react-feather";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

import Avatar from "../components/avatar";
import ActivityButton from "../components/activityButton";
import Head from "../components/head";

const Compose = () => {
  const activityTapped = message => {
    alert(message);
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <Head title="Agrega una actividad" />
      <Link href="/">
        <a className="self-start p-4 pt-6 -mb-16 text-indigo-600">
          <ArrowLeft />
        </a>
      </Link>
      <div className="mt-2 flex items-center">
        <Avatar />
        <div className="-ml-3 pl-3 pr-2 py-2 bg-gray-300 rounded-tr-full rounded-br-full">
          <span className="mx-3 font-bold">Diego</span>
          <ChevronDown className="inline-block" />
        </div>
      </div>
      <div className="my-8">
        <span
          className="text-indigo-600 text-2xl font-bold"
          onClick={activityTapped}
        >
          ¿Que tarea completaste?
        </span>
      </div>
      <div className="flex flex-wrap">
        <ActivityButton
          icon="toothbrush"
          text="Cepillarme los dientes"
          onClick={() => activityTapped("pruebas")}
        />
        <ActivityButton icon="bathtub" text="Bañarme" />
        <ActivityButton icon="book" text="Hacer la tarea" />
        <ActivityButton icon="hand" text="Ayudar en la casa" />
      </div>
    </div>
  );
};

export default Compose;
