import { lazy } from "react";

const HomePage = lazy(() => import("./Home/Home"));
const CartPage = lazy(() => import("./Cart/Cart"));
const ListPage = lazy(() => import("./List/List"));
const AuthPage = lazy(() => import("./Auth/Auth"));
const LogoutPage = lazy(() => import("./Auth/Logout/Logout"));
const DashboardPage = lazy(() => import("./Dashboard/Dashboard"));
const ProductDetailPage = lazy(() => import("./ProductDetail/ProductDetail"));
const CheckoutPage = lazy(() => import("./Checkout/Checkout"));

const routes = [
  {
    path: "/list",
    exact: false,
    routePublic: true,
    component: ListPage,
    template: "fullTemplate",
    special: false,
  },
  {
    path: "/cart",
    exact: false,
    routePublic: true,
    component: CartPage,
    template: "fullTemplate",
    special: false,
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
    path: "/dashboard",
    exact: false,
    routePublic: false,
    component: DashboardPage,
    template: "fullTemplate",
    special: false,
  },
  {
    path: "/product/:productId",
    exact: false,
    routePublic: true,
    component: ProductDetailPage,
    template: "fullTemplate",
    special: false,
  },
  {
    path: "/checkout",
    exact: false,
    routePublic: false,
    component: CheckoutPage,
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
    path: "/",
    exact: true,
    routePublic: true,
    component: HomePage,
    template: "fullTemplate",
    special: false,
  },
];

export default routes;
