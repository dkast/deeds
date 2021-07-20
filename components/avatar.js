const Avatar = props => {
  const {
    size = "md",
    imgFile,
    bgColor = "8C19FF",
    className,
    ...restProps
  } = props;
  let width;
  let height;

  switch (size) {
    case "sm":
      width = "w-10";
      height = "h-10";
      break;
    case "md":
      width = "w-12";
      height = "h-12";
      break;
    case "lg":
      width = "w-16";
      height = "h-16";
      break;
    case "xl":
      width = "w-28";
      height = "h-28";
    default:
      break;
  }

  if (imgFile) {
    return (
      <div
        className={`${height} ${width} rounded-full shadow z-10 ${className}`}
      >
        <img
          className="object-cover overflow-hidden rounded-full"
          src={`/static/images/avatars/${imgFile}`}
          style={{ backgroundColor: `#${bgColor}` }}
          alt="avatar"
        />
      </div>
    );
  }

  return (
    <div
      className={`${height} ${width} bg-gray-300 animate-pulse object-cover rounded-full shadow z-10 ${className}`}
    ></div>
  );
};

export default Avatar;
