const Avatar = props => {
  const {
    size = "md",
    imgFile = "mario-run.jpg",
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
      sizeClass = "20";
      break;
    case "xl":
      sizeClass = "24";
    default:
      break;
  }

  return (
    <img
      className={`h-${sizeClass} w-${sizeClass} object-cover rounded-full shadow z-10 ${className}`}
      src={`/static/images/avatars/${imgFile}`}
      style={{ backgroundColor: `#${bgColor}` }}
      alt="avatar"
    />
  );
};

export default Avatar;
