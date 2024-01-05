import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "../components/Spinner";
// import { HomeLayout } from '@/components/Layout';
import { HomeLayout } from "../layouts/HomeLayout";

import AdminPage from "../features/admin/route/AdminPage";
import { HomeRoutes } from "../features/homepage/route";
import { ProfileRoutes } from "../features/profile/route";

import { SelectCourse } from "../features/course/components/SelectCourse";
import SelectCoursePage from "../features/course/route/SelectCoursePage";
import { CourseRoutes } from "../features/course/route";
import RouteError from "../components/RouteError";
import ResetPasswordPage from "../features/auth/route/ResetPasswordPage";
import RequestPage from "../features/teach/route/RequestPage";
import UploadPage from "../features/teach/route/UploadPage";
import { SearchRoutes } from "../features/search/route";
import { CategoryPage } from "../components/Pages/CategoryPage";
import { FollowPage } from "../features/profile/route/FollowPage";
import { ProfilePage, UserProfileRoute, userRoute } from "../features/users";
import NewUpload from "../features/teach/components/NewUpload";
import { TeachRoutes } from "../features/teach/route";
import TeacherDashboard from "../features/teach/components/TeacherDashboard";
import CourseEdit from "../features/teach/components/CourseEdit";

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
        element: <UserProfileRoute />,
      },
      {
        path: "search/*",
        element: <SearchRoutes />,
      },
      {
        path: "course/*",
        element: <CourseRoutes />,
      },

      {
        path: "home",
        element: <HomeRoutes />,
      },
      {
        path: "following",
        element: <FollowPage />,
      },

      {
        path: "category/:catID",
        element: <CategoryPage />,
      },

      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "teach/request",
        element: <RequestPage />,
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

export const contentCreatorRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      // { path: '/discussions/*', element: <DiscussionsRoutes /> },
      // { path: '/users', element: <Users /> },
      {
        path: "profile/*",
        element: <UserProfileRoute />,
      },
      {
        path: "course/*",
        element: <CourseRoutes />,
      },
      {
        path: "following",
        element: <FollowPage />,
      },
      {
        path: "category/:catID",
        element: <CategoryPage />,
      },
      {
        path: "search/*",
        element: <SearchRoutes />,
      },
      {
        path: "teach/upload",
        element: <NewUpload />,
      },

      {
        path: "home",
        element: <HomeRoutes />,
      },
      {
        path: "teach/dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "teach/course/:courseID",
        element: <CourseEdit />,
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

export const adminRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      // { path: '/discussions/*', element: <DiscussionsRoutes /> },
      // { path: '/users', element: <Users /> },

      {
        path: "course/*",
        element: <CourseRoutes />,
      },
      {
        path: "following",
        element: <FollowPage />,
      },
      {
        path: "category/:catID",
        element: <CategoryPage />,
      },
      {
        path: "search/*",
        element: <SearchRoutes />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "teach/upload",
        element: <NewUpload />,
      },

      {
        path: "home",
        element: <HomeRoutes />,
      },
      {
        path: "teach/dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "teach/course/:courseID",
        element: <CourseEdit />,
      },
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "profile/*",
        element: <UserProfileRoute />,
      },
      // ...userRoute
      // { path: '/', element: <Dashboard /> },
      // { path: '*', element: <Navigate to="." /> },
    ],
  },
  {
    path: "auth/reset-password",
    element: <ResetPasswordPage />,
  },
];
