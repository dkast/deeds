import Link from "next/link";
import { Plus } from "react-feather";

import NavBar from "../components/navbar";
import Container from "../components/container";
import Timeline from "../components/timeline";
import Head from "../components/head";
import Auth from "../components/auth";

const Home = () => (
  <Auth>
    <div className="flex h-screen flex-col">
      <Head />
      <NavBar title="Inicio" />
      <Container>
        <Timeline />
      </Container>
      <div className="fixed bottom-0 mb-10 w-full text-center">
        <Link href="/compose">
          <a className="inline-block h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-500 p-4 text-white shadow-lg shadow-fuchsia-500/50 hover:bg-indigo-800">
            <Plus size={32} />
          </a>
        </Link>
      </div>
    </div>
  </Auth>
);

export default Home;
