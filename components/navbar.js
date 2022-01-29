import { CheckCircle, Award, Smile, ArrowLeft } from "react-feather";
import Link from "next/link";

import ActiveLink from "./activeLink";
import Avatar from "./avatar";
import useUser from "../hooks/useUser";

const NavBar = props => {
  const { title, showAvatar = true, ...restProps } = props;
  const { user, loading, userError } = useUser();

  const activeClassname =
    "border-b-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-500 bg-gradient-to-t from-indigo-100 dark:from-indigo-900 to-transparent";
  return (
    <nav className="fixed top-0 z-30 w-full bg-white shadow dark:bg-black">
      <div className="mx-auto w-full md:w-1/2">
        <div className="flex p-4">
          {showAvatar && (
            <div className="mr-4">
              <Avatar imgFile={user?.avatar} bgColor={user?.color} />
            </div>
          )}
          {!showAvatar && (
            <Link href="/">
              <a className="self-start pt-2 text-indigo-600">
                <ArrowLeft />
              </a>
            </Link>
          )}
          <div className={showAvatar ? "pt-2" : "ml-4 pt-1"}>
            <span className="text-2xl font-bold dark:text-white">{title}</span>
          </div>
        </div>
        {showAvatar && (
          <div className="flex flex-row text-gray-600">
            <ActiveLink href="/" activeClassName={activeClassname}>
              <a className="flex-1 border-0 pb-2">
                <CheckCircle className="mx-auto" />
              </a>
            </ActiveLink>
            <ActiveLink href="/awards" activeClassName={activeClassname}>
              <a className="flex-1 border-0 pb-2">
                <Award className="mx-auto" />
              </a>
            </ActiveLink>
            <ActiveLink href="/profile" activeClassName={activeClassname}>
              <a className="flex-1 border-0 pb-2">
                <Smile className="mx-auto" />
              </a>
            </ActiveLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
