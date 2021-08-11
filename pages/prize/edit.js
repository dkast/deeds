import Link from "next/link";
import { ArrowLeft } from "react-feather";

import Auth from "../../components/auth";
import Head from "../../components/head";

const EditPrize = () => {
  return (
    <Auth>
      <div className="h-screen flex flex-col items-center bg-white dark:bg-black">
        <Head title="Premio"></Head>
        <Link href="/">
          <a className="self-start p-4 pt-6 -mb-16 text-indigo-600">
            <ArrowLeft />
          </a>
        </Link>
      </div>
    </Auth>
  );
};

export default EditPrize;
