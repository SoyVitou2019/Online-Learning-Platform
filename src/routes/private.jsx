import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Spinner';
// import { HomeLayout } from '@/components/Layout';
import { HomeLayout } from '../layouts/HomeLayout';
import ProfilePage from '../features/profile/route/ProfilePage';

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
        path: '/app',
        element: <App />,
        children: [
            // { path: '/discussions/*', element: <DiscussionsRoutes /> },
            // { path: '/users', element: <Users /> },

            { path: '/app/profile', element: <ProfilePage /> },

            // { path: '/', element: <Dashboard /> },
            // { path: '*', element: <Navigate to="." /> },
        ],
    },
];
