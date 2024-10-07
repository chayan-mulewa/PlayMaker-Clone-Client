import { lazy } from "react";

const Login = lazy(() =>
  import("../pages").then((module) => ({ default: module.Login }))
);
const Signup = lazy(() =>
  import("../pages").then((module) => ({ default: module.Signup }))
);
const PageNotFound = lazy(() =>
  import("../pages").then((module) => ({ default: module.PageNotFound }))
);

const userRoute = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default userRoute;
