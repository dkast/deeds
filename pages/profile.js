import NavBar from "../components/navbar";
import Container from "../components/container";
import Head from "../components/head";
import Auth from "../components/auth";
import ProfileHeader from "../components/profileHeader";
import useUser from "../hooks/useUser";

export default () => {
  const { user, loading, userError } = useUser();

  return (
    <Auth>
      <div className="h-screen flex flex-col">
        <Head title="Mi Perfil" />
        <NavBar title="Mi Perfil" showAvatar={false} />
        <Container>
          <ProfileHeader user={user} />
        </Container>
      </div>
    </Auth>
  );
};
