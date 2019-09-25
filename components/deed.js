import React, { useState, useEffect } from "react";

const Deed = props => {
  const { dataItem } = props;
  const [icon, setIcon] = useState("");

  useEffect(
    () => {
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
    },
    { dataItem }
  );

  const getMessageFromActivity = actType => {
    let message;
    let icon;
    switch (actType) {
      case "activity_tbrush":
        message = "se cepilló los dientes.";
        break;
      case "activity_bath":
        message = "se dió un baño.";
        break;
      case "activity_homework":
        message = "hizo la tarea";
        break;
      case "activity_help":
        message = "ayudó en la casa";
        break;
      default:
        break;
    }
    return message;
  };

  return (
    <div className="rounded-lg shadow-lg bg-white">
      {/* {console.dir(dataItem)}
      {console.dir(dataItem.userData)} */}
      <div className="flex p-2">
        <div className="relative py-1 px-3">
          <img
            src={`/static/images/${icon}`}
            className="w-16 h-16"
            alt="icon"
          />
          <img
            src="/static/images/avatars/mario-run.jpg"
            className="rounded-full h-10 w-10 object-cover absolute bottom-0 right-0 border-2 border-white"
            alt="Avatar"
          />
        </div>
        <div className="mx-4 my-2 flex flex-col justify-between flex-grow">
          <div className="text-indigo-600">
            <span className="font-bold mr-1">{dataItem.userData.name}</span>
            <span>{getMessageFromActivity(dataItem.actType)}</span>
          </div>
          <div className="flex items-center h-5 self-end">
            <img src="/static/images/gem.svg" className="w-5 h-5" alt="coin" />
            <span className="ml-1 tracking-tight font-bold text-orange-500">
              {dataItem.points}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-bl-lg rounded-br-lg bg-indigo-600 h-1"></div>
    </div>
  );
};

export default Deed;
