import { Route, Routes } from "react-router-dom";

import ProfilePage from "./ProfilePage";
import { FollowPage } from "./FollowPage";

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<ProfilePage />} />
      <Route
        path="/:id/following"
        element={<FollowPage isFollowing={true} />}
      />
      <Route
        path="/:id/follower"
        element={<FollowPage isFollowing={false} />}
      />
    </Routes>
  );
};
