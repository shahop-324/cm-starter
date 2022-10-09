import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import MainLayout from "../layouts/main";
import DashboardLayout from "../layouts/dashboard";

// config
import { PATH_AFTER_LOGIN } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { path: '*', element: <Navigate to="/404" replace /> },
    {
        path: '*',
        element: <MainLayout />,
        children: [
          { path: '404', element: <Page404 /> },
          { path: '*', element: <Navigate to="/404" replace /> },
        ],
      },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
      ],
    },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Page404 = Loadable(
  lazy(() => import("../pages/Page404"))
);
