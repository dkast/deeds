const ProfileHeader = props => {
  const { user, ...restProps } = props;
  return <div>{user && <div>{user.name}</div>}</div>;
};

export default ProfileHeader;
