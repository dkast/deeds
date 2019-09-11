import NavBar from "../components/navbar";
import Container from "../components/container";
import Head from "../components/head";

export default () => (
  <div className="h-screen flex flex-col">
    <Head title="Mi Perfil" />
    <NavBar title="Mi Perfil" />
    <Container>Pruebas</Container>
  </div>
);
