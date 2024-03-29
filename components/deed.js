import React, { useState, useEffect } from "react";
import esLocale from "date-fns/locale/es";
import { formatDistanceToNowStrict } from "date-fns";

const Deed = props => {
  const { dataItem } = props;
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let message;
    let icon;
    switch (dataItem.actType) {
      case "activity_tbrush":
        message = "se cepilló los dientes.";
        icon = "dental-care.svg";
        break;
      case "activity_bath":
        message = "se dió un baño.";
        icon = "rubber-duck.svg";
        break;
      case "activity_homework":
        message = "hizo la tarea.";
        icon = "backpack.svg";
        break;
      case "activity_help":
        message = "ayudó en la casa.";
        icon = "volunteer.svg";
        break;
      case "activity_online":
        message = "tomó clase online.";
        icon = "laptop.svg";
        break;
      case "activity_excercise":
        message = "hizo ejercicio.";
        icon = "triangle.svg";
        break;
      case "activity_swim":
        message = "hizo natación.";
        icon = "swimmer.svg";
        break;
      case "activity_diet":
        message = "comió saludable.";
        icon = "diet.svg";
        break;
      default:
        break;
    }
    setIcon(icon);
    setMessage(message);
  }, [dataItem]);

  return (
    <div className="mb-3 bg-white px-4 dark:bg-black">
      <div className="grid grid-cols-5 py-2">
        <div>
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-300">
            <img
              src={`/static/images/${icon}`}
              className="h-12 w-12"
              alt="icon"
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-grow flex-col">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-semibold text-gray-900 dark:text-indigo-500">
                {dataItem.userData.name}
              </span>
              <span className="ml-1 text-gray-600 dark:text-gray-300">
                {message}
              </span>
            </div>
          </div>
          <span className="text-sm text-gray-400">
            Hace{" "}
            {formatDistanceToNowStrict(dataItem.timestamp.toDate(), {
              locale: esLocale
            })}
          </span>
        </div>
        <div className="flex justify-end">
          <div className="my-2 flex w-16 items-center justify-center rounded-full bg-orange-100 px-3 py-0.5 dark:bg-orange-800 dark:bg-opacity-20">
            <img
              src="/static/images/gem.svg"
              className="inline h-4 w-4"
              alt="coin"
            />
            <span className="ml-2 font-bold tracking-tight text-orange-600">
              {dataItem.points}
            </span>
          </div>
        </div>
        <span className="col-span-4 col-start-2 py-2 dark:text-white">
          {dataItem.comment}
        </span>
      </div>
    </div>
  );
};

export default Deed;
