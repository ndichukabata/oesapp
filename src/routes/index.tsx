import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router'
import MainLayout from '@/layouts/MainLayout.tsx'
import PrivateRoute from './PrivateRoute'

// Dashboards
const Dashboard = lazy(() => import('@/views/dashboards/dashboard'))

// Landing
const Landing = lazy(() => import('@/views/landing'))

// Auth

const Auth3SignIn = lazy(() => import('@/views/auth/sign-in'))
const Auth3SignUp = lazy(() => import('@/views/auth/sign-up'))
const Auth3ResetPassword = lazy(() => import('@/views/auth/reset-password'))
const Auth3NewPassword = lazy(() => import('@/views/auth/new-password'))
const Auth3TwoFactor = lazy(() => import('@/views/auth/two-factor'))
const Auth3LockScreen = lazy(() => import('@/views/auth/lock-screen'))
const Auth3SuccessMail = lazy(() => import('@/views/auth/success-mail'))
const Auth3DeleteAccount = lazy(() => import('@/views/auth/delete-account'))


const Profile = lazy(() => import('@/views/profile/profile'))

// Error
const Error400 = lazy(() => import('@/views/error/400'))
const Error401 = lazy(() => import('@/views/error/401'))
const Error403 = lazy(() => import('@/views/error/403'))
const Error404 = lazy(() => import('@/views/error/404'))
const Error408 = lazy(() => import('@/views/error/408'))
const Error500 = lazy(() => import('@/views/error/500'))
const Maintenance = lazy(() => import('@/views/other-pages/maintenance'))



const authRoutes: RouteObject[] = [

  { path: '/auth/sign-in', element: <Auth3SignIn /> },
  { path: '/auth/sign-up', element: <Auth3SignUp /> },
  { path: '/auth/reset-password', element: <Auth3ResetPassword /> },
  { path: '/auth/new-password', element: <Auth3NewPassword /> },
  { path: '/auth/two-factor', element: <PrivateRoute><Auth3TwoFactor /></PrivateRoute> },
  { path: '/auth/lock-screen', element: <Auth3LockScreen /> },
  { path: '/auth/success-mail', element: <Auth3SuccessMail /> },
  { path: '/auth/delete-account', element: <Auth3DeleteAccount /> },
]

const errorRoutes: RouteObject[] = [
  { path: '/error/400', element: <Error400 /> },
  { path: '/error/401', element: <Error401 /> },
  { path: '/error/403', element: <Error403 /> },
  { path: '/error/404', element: <Error404 /> },
  { path: '/error/408', element: <Error408 /> },
  { path: '/error/500', element: <Error500 /> },
]

const otherPagesRoutes: RouteObject[] = [
  { path: '/maintenance', element: <Maintenance /> },

]

const dashboardRoutes: RouteObject[] = [{ path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> }]

const landingRoute: RouteObject[] = [{ path: '/landing', element: <Landing /> }]



const allRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
     { path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute> },
      ...dashboardRoutes,
    ],
  },
]

const otherRoutes: RouteObject[] = [...authRoutes, ...errorRoutes, ...landingRoute, ...otherPagesRoutes]

export const routes: RouteObject[] = [...allRoutes, ...otherRoutes]
