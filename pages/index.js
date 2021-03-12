import Link from "next/link";
import { Plus } from "react-feather";

import NavBar from "../components/navbar";
import Container from "../components/container";
import Timeline from "../components/timeline";
import Head from "../components/head";
import Auth from "../components/auth";

const Home = () => (
  <Auth>
    <div className="h-screen flex flex-col">
      <Head />
      <NavBar title="Inicio" />
      <Container>
        <Timeline />
      </Container>
      <div className="fixed bottom-0 w-full text-center mb-10">
        <Link href="/compose">
          <a className="rounded-full w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-500 hover:bg-indigo-800 p-4 text-white shadow-lg inline-block">
            <Plus size={32} />
          </a>
        </Link>
      </div>
    </div>
  </Auth>
);

export default Home;
