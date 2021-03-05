import React, { useState, useEffect } from "react";
import esLocale from "date-fns/locale/es";
import { formatDistanceToNowStrict } from "date-fns";

const Deed = (props) => {
  const { dataItem } = props;
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let message;
    let icon;
    switch (dataItem.actType) {
      case "activity_tbrush":
        message = "se cepilló los dientes.";
        icon = "toothbrush.svg";
        break;
      case "activity_bath":
        message = "se dió un baño.";
        icon = "bathtub.svg";
        break;
      case "activity_homework":
        message = "hizo la tarea.";
        icon = "book.svg";
        break;
      case "activity_help":
        message = "ayudó en la casa.";
        icon = "hand.svg";
        break;
      default:
        break;
    }
    setIcon(icon);
    setMessage(message);
  }, [dataItem]);

  return (
    <div className="rounded shadow bg-white dark:bg-gray-900 mb-3">
      <div className="flex p-4">
        <div className="relative py-1 px-2">
          <img
            src={`/static/images/${icon}`}
            className="w-12 h-12"
            alt="icon"
          />
          <img
            src={`/static/images/avatars/${dataItem.userData.avatar}`}
            className="rounded-full h-8 w-8 object-cover absolute bottom-0 right-0 border-2 border-white"
            alt="Avatar"
            style={{ backgroundColor: `#${dataItem.userData.color}` }}
          />
        </div>
        <div className="flex flex-row justify-between flex-grow">
          <div className="ml-4">
            <span className="text-gray-900 dark:text-indigo-500 font-semibold">
              {dataItem.userData.name}
            </span>
            <span className="ml-1 text-gray-600 dark:text-gray-300">{message}</span>
            <div className="flex items-center justify-center bg-orange-100 w-16 rounded-full px-3 py-0.5 mt-1">
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
          <div className="">
            <span className="inline-block text-gray-400 text-sm">
              {
                formatDistanceToNowStrict(dataItem.timestamp.toDate(), {
                  locale: esLocale,
                })}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="rounded-bl-lg rounded-br-lg bg-indigo-600 h-1"></div> */}
    </div>
  );
};

export default Deed;
