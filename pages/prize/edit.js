import Link from "next/link";
import { ArrowLeft } from "react-feather";
import { useForm } from "react-hook-form";

import Auth from "../../components/auth";
import Head from "../../components/head";

const EditPrize = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Auth>
      <div className="h-screen flex flex-col items-center bg-white dark:bg-black">
        <Head title="Premio"></Head>
        <Link href="/">
          <a className="self-start p-4 pt-6 -mb-16 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
        <div className="my-6">
          <span className="text-indigo-600 text-2xl font-bold">
            Agregar Premio
          </span>
        </div>
        <form action="">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripcion
            </label>
            <input
              type="text"
              placeholder="Descripcion"
              {...register("description", { required: true })}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full 
              sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:placeholder-gray-700"
            />
          </div>
        </form>
      </div>
    </Auth>
  );
};

export default EditPrize;
