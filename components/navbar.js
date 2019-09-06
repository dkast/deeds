import { CheckCircle, Award, Smile } from "react-feather";

import ActiveLink from "./activeLink";

const Navbar = props => (
  <nav className="shadow bg-white fixed top-0 w-full">
    <div className="w-full md:w-1/2 mx-auto">
      <div className="flex p-4">
        <img
          className="h-12 w-12 object-cover rounded shadow"
          src="/static/images/avatars/mario-run.jpg"
          alt="avatar"
        />
        <div className="pl-4 pt-2">
          <span className="text-2xl font-bold">{props.title}</span>
        </div>
      </div>
      <div className="flex flex-row text-gray-600">
        <ActiveLink
          href="/"
          activeClassName="border-b-4 border-indigo-600 text-indigo-600"
        >
          <a className="flex-1 pb-2 border-0">
            <CheckCircle className="mx-auto" />
          </a>
        </ActiveLink>
        <ActiveLink
          href="/awards"
          activeClassName="border-b-4 border-indigo-600 text-indigo-600"
        >
          <a className="flex-1 pb-2 border-0">
            <Award className="mx-auto" />
          </a>
        </ActiveLink>
        <ActiveLink
          href="/profile"
          activeClassName="border-b-4 border-indigo-600 text-indigo-600"
        >
          <a className="flex-1 pb-2 border-0">
            <Smile className="mx-auto" />
          </a>
        </ActiveLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
