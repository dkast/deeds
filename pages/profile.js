import NavBar from "@components/navbar";
import Container from "@components/container";
import Head from "@components/head";
import Auth from "@components/auth";
import ProfileHeader from "@components/profileHeader";
import Loader from "@components/loader";
import useUser from "@hooks/useUser";

const Profile = () => {
  const [user, loading, userError] = useUser();

  return (
    <Auth>
      <div className="flex h-screen flex-col">
        <Head title="Mi Perfil" />
        <NavBar title="Mi Perfil" showAvatar={false} />
        <Container>
          {user && <ProfileHeader user={user} />}
          {loading && <Loader></Loader>}
          {userError && <p>userError</p>}
        </Container>
      </div>
    </Auth>
  );
};

export default Profile;
