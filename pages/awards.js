import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import AwardList from "@components/awardList";

const Awards = () => (
  <Auth>
    <div className="flex h-screen flex-col">
      <Head title="Premios" />
      <NavBar title="Premios" />
      <Container>
        <AwardList></AwardList>
      </Container>
    </div>
  </Auth>
);

export default Awards;
