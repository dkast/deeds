const ActivityButton = props => {
  return (
    <div className="cursor-pointer" onClick={props.onClick}>
      <div
        className="flex flex-col items-center text-center h-40 m-2 px-2 py-3 rounded-xl 
        bg-gradient-to-tl from-indigo-200 via-indigo-200 to-pink-100 
        dark:from-indigo-500 dark:via-indigo-500 dark:to-pink-300"
      >
        <img
          src={"/static/images/" + props.icon}
          className="w-14 h-14 mb-3"
          alt="icon"
        />
        <span className="dark:text-white text-sm">{props.text}</span>
        <div className="relative w-full">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-indigo-300 dark:border-indigo-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-indigo-200 dark:bg-indigo-500 px-2 text-gray-500">
              <img
                src="/static/images/gem.svg"
                className="w-4 h-4 inline"
                alt="coin"
              />
            </span>
          </div>
        </div>
        <span className="mt-1 tracking-tight font-bold text-orange-500 dark:text-orange-400">
          {props.points}
        </span>
      </div>
    </div>
  );
};

export default ActivityButton;
