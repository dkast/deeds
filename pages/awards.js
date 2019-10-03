import NavBar from "../components/navbar";
import Container from "../components/container";
import Head from "../components/head";
import Auth from "../components/auth";

export default () => (
  <Auth>
    <div className="h-screen flex flex-col">
      <Head title="Logros" />
      <NavBar title="Premios" />
      <Container>
        <div className="text-center">
          <span className="text-3xl text-gray-500">Proximamente</span>
        </div>
      </Container>
    </div>
  </Auth>
);
