import Image from "next/image";
const Avatar = (props) => {
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
      sizeClass = 40;
      break;
    case "md":
      sizeClass = 48;
      break;
    case "lg":
      sizeClass = 64;
      break;
    case "xl":
      sizeClass = 80;
    default:
      break;
  }

  return (
    <Image
      className={`object-cover rounded-full shadow z-10 ${className}`}
      src={`/static/images/avatars/${imgFile}`}
      alt="avatar"
      style={{ backgroundColor: `#${bgColor}` }}
      width={sizeClass}
      height={sizeClass}
    />
  );
};

export default Avatar;
