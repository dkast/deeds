import Link from "next/link";
import { ArrowLeft } from "react-feather";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { useFirebaseApp } from "../../firebase";
import Auth from "../../components/auth";
import Head from "../../components/head";

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
      <div className="h-screen flex flex-col items-center bg-white dark:bg-black">
        <Head title="Premio"></Head>
        <Link href="/awards">
          <a className="self-start p-4 pt-6 -mb-16 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
        <div className="my-6">
          <span className="text-indigo-600 text-2xl font-bold">
            Agregar Premio
          </span>
        </div>
        <div className="w-full md:w-1/2 px-4">
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full 
              sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:placeholder-gray-700"
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full 
              sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:placeholder-gray-700"
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full 
              sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-gray-800 dark:bg-gray-900 dark:placeholder-gray-700"
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="inline-flex text-center self-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
