const ActivityButton = props => {
  return (
    <div className="w-1/3 cursor-pointer" onClick={props.onClick}>
      <div className="flex flex-col flex-1 items-center text-center m-4">
        <img
          src={"/static/images/" + props.icon + ".svg"}
          className="w-20 h-20 mb-2"
          alt="icon"
        />
        <span>{props.text}</span>
      </div>
    </div>
  );
};

export default ActivityButton;
