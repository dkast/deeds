import NavBar from "../components/navbar";
import Container from "../components/container";
import Head from "../components/head";

export default () => (
  <div className="h-screen flex flex-col">
    <Head title="Logros" />
    <NavBar title="Premios" />
    <Container>Pruebas</Container>
  </div>
);
