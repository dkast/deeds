import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import ProfileHeader from "@components/profileHeader";
import useUser from "@hooks/useUser";

const Profile = () => {
  const { user, loading, userError } = useUser();

  return (
    <Auth>
      <div className="flex h-screen flex-col">
        <Head title="Mi Perfil" />
        <NavBar title="Mi Perfil" showAvatar={false} />
        <Container>
          <ProfileHeader user={user} />
        </Container>
      </div>
    </Auth>
  );
};

export default Profile;
