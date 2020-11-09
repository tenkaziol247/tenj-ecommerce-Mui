import { lazy } from "react";

const HomePage = lazy(() => import("./Home/Home"));
const CartPage = lazy(() => import("./Cart/Cart"));
const ListPage = lazy(() => import("./List/List"));

const routes = [
  {
    path: "/list",
    exact: true,
    public: true,
    component: ListPage,
    template: "fullTemplate",
  },
  {
    path: "/cart",
    exact: true,
    public: true,
    component: CartPage,
    template: "fullTemplate",
  },
  {
    path: "/",
    exact: true,
    public: true,
    component: HomePage,
    template: "fullTemplate",
  },
];

export default routes;
