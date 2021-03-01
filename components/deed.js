import React, { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import esLocale from "date-fns/locale/es";

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
    <div className="rounded shadow bg-white dark-mode:bg-gray-900 mb-3">
      {/* {console.dir(dataItem)}
      {console.dir(dataItem.userData)} */}
      <div className="flex p-2">
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
        <div className="ml-4 mr-2 my-2 flex flex-col justify-between flex-grow">
          <div>
            <span className="text-indigo-700 dark-mode:text-indigo-500 mr-1">
              {dataItem.userData.name}
            </span>
            <span className="dark-mode:text-gray-300">{message}</span>
          </div>
          <div className="flex justify-between h-5">
            <span className="inline-block text-gray-600 text-sm">
              {"Hace " +
                formatDistanceToNow(dataItem.timestamp.toDate(), {
                  locale: esLocale
                })}
            </span>
            <div className="flex items-center">
              <img
                src="/static/images/gem.svg"
                className="w-4 h-4 inline"
                alt="coin"
              />
              <span className="ml-1 tracking-tight font-bold text-orange-500">
                {dataItem.points}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="rounded-bl-lg rounded-br-lg bg-indigo-600 h-1"></div> */}
    </div>
  );
};

export default Deed;
