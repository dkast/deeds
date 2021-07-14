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
      default:
        break;
    }
    setIcon(icon);
    setMessage(message);
  }, [dataItem]);

  return (
    <div className="bg-white dark:bg-black mb-3 border-b border-gray-200 dark:border-gray-800 px-4">
      <div className="flex pt-2 pb-6">
        <div className="relative">
          <img
            src={`/static/images/${icon}`}
            className="w-12 h-12"
            alt="icon"
          />
          {/* <img
            src={`/static/images/avatars/${dataItem.userData.avatar}`}
            className="rounded-full h-6 w-6 object-cover absolute bottom-0 right-0 border-white"
            alt="Avatar"
            style={{ backgroundColor: `#${dataItem.userData.color}` }}
          /> */}
        </div>
        <div className="ml-4 flex flex-col flex-grow">
          <div className="flex justify-between flex-grow items-baseline">
            <div>
              <span className="text-gray-900 dark:text-indigo-500 font-semibold">
                {dataItem.userData.name}
              </span>
              <span className="text-gray-600 dark:text-gray-300 ml-1">
                {message}
              </span>
            </div>
          </div>
          <span className="text-gray-400 text-sm">
            Hace{" "}
            {formatDistanceToNowStrict(dataItem.timestamp.toDate(), {
              locale: esLocale
            })}
          </span>
        </div>
        <div className="flex justify-end">
          <div className="flex items-center justify-center my-2 bg-orange-100 dark:bg-orange-800 dark:bg-opacity-20 w-16 rounded-full px-3 py-0.5">
            <img
              src="/static/images/gem.svg"
              className="w-4 h-4 inline"
              alt="coin"
            />
            <span className="ml-2 tracking-tight font-bold text-orange-600">
              {dataItem.points}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="rounded-bl-lg rounded-br-lg bg-indigo-600 h-1"></div> */}
    </div>
  );
};

export default Deed;
