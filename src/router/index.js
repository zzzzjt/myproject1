const App = () => import("../components/Home");
const New_4G = () => import("../components/New_4G");

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
  },
  {
    path: "/New_4G",
    name: "New_4G",
    component: New_4G,
  },
];

export default routes;
