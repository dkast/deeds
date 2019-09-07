import { ChevronDown } from "react-feather";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

import Avatar from "../components/avatar";

const Compose = () => (
  <div className="h-screen flex flex-col items-center">
    <Link href="/">
      <a className="self-start p-4 pt-6 -mb-16">
        <ArrowLeft />
      </a>
    </Link>
    <div className="mt-2 flex items-center">
      <Avatar />
      <div className="-ml-2 pl-3 pr-2 py-2 bg-gray-300 rounded-tr-full rounded-br-full">
        <span className="mx-3 font-bold">Diego</span>
        <ChevronDown className="inline-block" />
      </div>
    </div>
    <div className="mt-8">
      <span className="text-indigo-600 text-2xl font-bold">
        Selecciona una actividad
      </span>
    </div>
  </div>
);

export default Compose;
