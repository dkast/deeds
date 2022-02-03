import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import useUser from "@hooks/useUser";

const Family = () => {
  const { user, loading, userError } = useUser();

  return (
    <Auth>
      <div className="flex h-screen flex-col">
        <Head title="Admin" />
        <NavBar title="Admin" />
        <Container></Container>
      </div>
    </Auth>
  );
};

export default Family;
