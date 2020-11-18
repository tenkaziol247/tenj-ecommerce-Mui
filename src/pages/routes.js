import { lazy } from "react";

const HomePage = lazy(() => import("./Home/Home"));
const CartPage = lazy(() => import("./Cart/Cart"));
const ListPage = lazy(() => import("./List/List"));
const AuthPage = lazy(() => import("./Auth/Auth"));
const LogoutPage = lazy(() => import("./Auth/Logout/Logout"));
const ProfilePage = lazy(() => import("./Profile/Profile"));

const routes = [
  {
    path: "/list",
    exact: true,
    routePublic: true,
    component: ListPage,
    template: "fullTemplate",
    special: false,
  },
  {
    path: "/cart",
    exact: true,
    routePublic: true,
    component: CartPage,
    template: "fullTemplate",
    special: false,
  },
  {
    path: "/auth",
    exact: true,
    routePublic: true,
    component: AuthPage,
    template: "authTemplate",
    special: true,
  },
  {
    path: "/logout",
    exact: true,
    routePublic: false,
    component: LogoutPage,
    template: "authTemplate",
    special: false,
  },
  {
    path: "/profile",
    exact: false,
    routePublic: false,
    component: ProfilePage,
    template: "fullTemplate",
    special: false,
  },
  {
    path: "/",
    exact: true,
    routePublic: true,
    component: HomePage,
    template: "fullTemplate",
    special: false,
  },
];

export default routes;
