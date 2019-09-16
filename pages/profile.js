import NavBar from "../components/navbar";
import Container from "../components/container";
import Head from "../components/head";
import Auth from "../components/auth";

export default () => (
  <Auth>
    <div className="h-screen flex flex-col">
      <Head title="Mi Perfil" />
      <NavBar title="Mi Perfil" />
      <Container>Perfil</Container>
    </div>
  </Auth>
);
