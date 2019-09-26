import { CheckCircle, Award, Smile } from "react-feather";

import ActiveLink from "./activeLink";
import Avatar from "./avatar";
import useUser from "../hooks/useUser";

const NavBar = props => {
  const { title, showAvatar = true, ...restProps } = props;
  const { user, loading, userError } = useUser();

  const activeClassname = "border-b-2 border-indigo-600 text-indigo-600 z-30";
  return (
    <nav className="shadow bg-white fixed top-0 w-full">
      <div className="w-full md:w-1/2 mx-auto">
        <div className="flex p-4">
          {user && showAvatar && (
            <Avatar
              imgFile={user.avatar}
              bgColor={user.color}
              className="mr-4"
            />
          )}
          <div className={"pt-2 " + (showAvatar ? "" : "text-center block")}>
            <span className="text-2xl font-bold">{title}</span>
          </div>
        </div>
        <div className="flex flex-row text-gray-600">
          <ActiveLink href="/" activeClassName={activeClassname}>
            <a className="flex-1 pb-2 border-0">
              <CheckCircle className="mx-auto" />
            </a>
          </ActiveLink>
          <ActiveLink href="/awards" activeClassName={activeClassname}>
            <a className="flex-1 pb-2 border-0">
              <Award className="mx-auto" />
            </a>
          </ActiveLink>
          <ActiveLink href="/profile" activeClassName={activeClassname}>
            <a className="flex-1 pb-2 border-0">
              <Smile className="mx-auto" />
            </a>
          </ActiveLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
