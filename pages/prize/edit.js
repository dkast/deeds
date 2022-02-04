import Link from "next/link";
import { ArrowLeft } from "react-feather";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { useFirebaseApp } from "../../firebase";
import Auth from "@components/auth";
import Head from "@components/head";

const EditPrize = () => {
  const firebaseApp = useFirebaseApp();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
    firebaseApp
      .firestore()
      .collection("awards")
      .add(data)
      .then(ref => {
        router.push("/awards");
      })
      .catch(error => {
        alert("Ocurrio un error al guardar premio");
      });
  };

  return (
    <Auth>
      <div className="flex h-screen flex-col items-center bg-white dark:bg-black">
        <Head title="Premio"></Head>
        <Link href="/awards">
          <a className="-mb-16 self-start p-4 pt-6 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
        <div className="my-6">
          <span className="text-2xl font-bold text-indigo-600">
            Agregar Premio
          </span>
        </div>
        <div className="w-full px-4 md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-y-6 gap-x-4"
          >
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripcion
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Descripcion"
                  {...register("description", { required: true })}
                  className="block w-full rounded-md border-gray-300 
              focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-700 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                URL Imagen
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="URL Imagen"
                  {...register("imageUrl", { required: true })}
                  className="block w-full rounded-md border-gray-300 
              focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-700 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="points"
                className="block text-sm font-medium text-gray-700"
              >
                Puntos
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  placeholder="Puntos"
                  {...register("points", { required: true })}
                  className="block w-full rounded-md border-gray-300 
              focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-700 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="inline-flex self-center rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-center text-base font-medium text-white shadow-md shadow-indigo-400/50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:shadow-indigo-700/50"
              >
                Guardar
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </Auth>
  );
};

export default EditPrize;
