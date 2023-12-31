import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "@/components/Spinner";
// import { HomeLayout } from '@/components/Layout';
import { HomeLayout } from "../layouts/HomeLayout";

import AdminPage from "../features/admin/route/AdminPage";
import { HomeRoutes } from "../features/homepage/route";
import { ProfileRoutes } from "../features/profile/route";

import UploadPage from "../features/teach/route/UploadPage";
import { SelectCourse } from "../features/course/components/SelectCourse";
import SelectCoursePage from "../features/course/route/SelectCoursePage";
import { CourseRoutes } from "../features/course/route";
import RouteError from "../components/RouteError";
import ResetPasswordPage from "../features/auth/route/ResetPasswordPage";

// import { lazyImport } from '@/utils/lazyImport';

// const { DiscussionsRoutes } = lazyImport(
//     () => import('@/features/discussions'),
//     'DiscussionsRoutes'
// );
// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
// const { Users } = lazyImport(() => import('@/features/users'), 'Users');

const App = () => {
  return (
    <HomeLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </HomeLayout>

    // <HomeLayout>
    //   <Suspense fallback={<div>Loading...</div>}>
    //     <Outlet />
    //   </Suspense>
    // </HomeLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      // { path: '/discussions/*', element: <DiscussionsRoutes /> },
      // { path: '/users', element: <Users /> },
      {
        path: "profile/*",
        element: <ProfileRoutes />,
      },
      {
        path: "course/*",
        element: <CourseRoutes />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },

      {
        path: "home",
        element: <HomeRoutes />,
      },

      {
        path: "",
        element: <Navigate to="/home" />,
      },

      // { path: '/', element: <Dashboard /> },
      // { path: '*', element: <Navigate to="." /> },
    ],
  },
  {
    path: "auth/reset-password",
    element: <ResetPasswordPage />,
  },
];
