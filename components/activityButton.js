const ActivityButton = props => {
  return (
    <div className="cursor-pointer" onClick={props.onClick}>
      <div className="flex flex-col items-center text-center h-36 m-2 px-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-900">
        <img
          src={"/static/images/" + props.icon}
          className="w-14 h-14 mb-3"
          alt="icon"
        />
        <span className="dark:text-white text-sm">{props.text}</span>
      </div>
    </div>
  );
};

export default ActivityButton;
