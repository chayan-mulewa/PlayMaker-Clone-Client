import { lazy } from "react";

const Login = lazy(() =>
  import("../pages/admin").then((module) => ({ default: module.Login }))
);
const Signup = lazy(() =>
  import("../pages/admin").then((module) => ({ default: module.Signup }))
);
const Profile = lazy(() =>
  import("../pages/admin").then((module) => ({ default: module.Profile }))
);
Profile;

const adminRoute = [
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/signup",
    element: <Signup />,
  },
  {
    path: "/admin/profile",
    element: <Profile />,
  },
];

export default adminRoute;
