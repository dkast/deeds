import NavBar from "../components/navbar";
import Container from "../components/container";
import Head from "../components/head";
import Auth from "../components/auth";
import AwardList from "../components/awardList";

const Awards = () => (
  <Auth>
    <div className="h-screen flex flex-col">
      <Head title="Logros" />
      <NavBar title="Premios" />
      <Container>
        <AwardList></AwardList>
      </Container>
    </div>
  </Auth>
);

export default Awards;
