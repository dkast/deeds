const ActivityButton = props => {
  return (
    <div className="w-1/3 cursor-pointer" onClick={props.onClick}>
      <div className="flex flex-col items-center text-center h-32 m-3 px-2 py-3 rounded-lg bg-gray-100 dark:bg-gray-900">
        <img
          src={"/static/images/" + props.icon + ".svg"}
          className="w-14 h-14 mb-3"
          alt="icon"
        />
        <span className="dark:text-white text-sm">{props.text}</span>
      </div>
    </div>
  );
};

export default ActivityButton;
