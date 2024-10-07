import { lazy } from "react";

const Home = lazy(() =>
  import("../pages").then((module) => ({ default: module.Home }))
);
const Shirts = lazy(() =>
  import("../pages").then((module) => ({ default: module.Shirts }))
);
const PoloShirts = lazy(() =>
  import("../pages").then((module) => ({ default: module.PoloShirts }))
);
const Coats = lazy(() =>
  import("../pages").then((module) => ({ default: module.Coats }))
);
const Overcoats = lazy(() =>
  import("../pages").then((module) => ({ default: module.Overcoats }))
);
const Pants = lazy(() =>
  import("../pages").then((module) => ({ default: module.Pants }))
);
const Jeans = lazy(() =>
  import("../pages").then((module) => ({ default: module.Jeans }))
);
const Chinos = lazy(() =>
  import("../pages").then((module) => ({ default: module.Chinos }))
);
const Cart = lazy(() =>
  import("../pages").then((module) => ({ default: module.Cart }))
);
const Profile = lazy(() =>
  import("../pages").then((module) => ({ default: module.Profile }))
);
const About = lazy(() =>
  import("../pages").then((module) => ({ default: module.About }))
);
const Loading = lazy(() =>
  import("../components").then((module) => ({ default: module.Loading }))
);
const PageNotFound = lazy(() =>
  import("../pages").then((module) => ({ default: module.PageNotFound }))
);

const appRoute = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/design/Shirts",
    element: <Shirts />,
  },
  {
    path: "/design/polo-shirts",
    element: <PoloShirts />,
  },
  {
    path: "/design/coats",
    element: <Coats />,
  },
  {
    path: "/design/overcoats",
    element: <Overcoats />,
  },
  {
    path: "/design/pants",
    element: <Pants />,
  },
  {
    path: "/design/jeans",
    element: <Jeans />,
  },
  {
    path: "/design/chinos",
    element: <Chinos />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default appRoute;
