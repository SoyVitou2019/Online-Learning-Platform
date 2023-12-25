import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "@/components/Spinner";
// import { HomeLayout } from '@/components/Layout';
import { HomeLayout } from "../layouts/HomeLayout";
import ProfilePage from "../features/profile/route/ProfilePage";

import AdminPage from "../features/admin/route/AdminPage";
import { HomeRoutes } from "../features/homepage/route";
import { LandingPage } from "../features/landing/route/LandingPage";
import { ProfileRoutes } from "../features/profile/route";

import UploadPage from "../features/teach/route/UploadPage";

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
        path: '/',
        element: <App />,
        children: [
            // { path: '/discussions/*', element: <DiscussionsRoutes /> },
            // { path: '/users', element: <Users /> },

            { path: '/profile', element: <ProfilePage /> },
            {
                path: "/landing",
                element: <LandingPage />,
            },
            {
                path: "/profile",
                element: <ProfileRoutes />,
            },
            {
                path: "/upload",
                element: <UploadPage />,
            },
            {
                path: "/admin",
                element: <AdminPage />,
            },


            {
                path: "/home",
                element: <HomeRoutes />,
            },
            {
                path: "/profile",
                element: <ProfileRoutes />,
            },
            {
                path: "/upload",
                element: <UploadPage />,
            },
            {
                path: "/admin",
                element: <AdminPage />,
            },

            // { path: '/', element: <Dashboard /> },
            // { path: '*', element: <Navigate to="." /> },
        ],
    },
];
