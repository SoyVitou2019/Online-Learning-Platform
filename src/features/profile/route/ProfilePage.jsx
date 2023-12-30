import { UserProfileSection } from "../components/UserProfileSection";

import { useParams } from "react-router-dom";

const ProfilePage = () => {
  let { id } = useParams();
  return <UserProfileSection user_id={id} />;
};

export default ProfilePage;
