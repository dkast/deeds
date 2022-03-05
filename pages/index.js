import Link from "next/link";
import { Plus } from "react-feather";
import { motion } from "framer-motion";

import NavBar from "@components/navbar";
import Container from "@components/container";
import Timeline from "@components/timeline";
import Head from "@components/head";
import Auth from "@components/auth";

const Home = () => (
  <Auth>
    <div className="flex h-screen flex-col">
      <Head />
      <NavBar title="Inicio" />
      <Container>
        <Timeline />
      </Container>
      <div className="fixed bottom-0 mb-10 w-full text-center">
        <Link href="/compose" passHref={true}>
          <motion.a
            whileTap={{ scale: 0.9 }}
            className="inline-block h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-500 p-4 text-white shadow-md shadow-fuchsia-500/50 hover:bg-indigo-800"
          >
            <Plus size={32} />
          </motion.a>
        </Link>
      </div>
    </div>
  </Auth>
);

export default Home;
