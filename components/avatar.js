const Avatar = props => {
  const {
    size = "md",
    imgFile,
    bgColor = "8C19FF",
    className,
    ...restProps
  } = props;
  let sizeClass;

  switch (size) {
    case "sm":
      sizeClass = "10";
      break;
    case "md":
      sizeClass = "12";
      break;
    case "lg":
      sizeClass = "16";
      break;
    case "xl":
      sizeClass = "20";
    default:
      break;
  }

  if (imgFile) {
    return (
      <img
        className={`h-${sizeClass} w-${sizeClass} object-cover rounded-full shadow z-10 ${className}`}
        src={`/static/images/avatars/${imgFile}`}
        style={{ backgroundColor: `#${bgColor}` }}
        alt="avatar"
      />
    );
  }

  return (
    <div
      className={`h-${sizeClass} w-${sizeClass} bg-gray-300 animate-pulse object-cover rounded-full shadow z-10 ${className}`}
    ></div>
  );
};

export default Avatar;
