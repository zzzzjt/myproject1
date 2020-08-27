const App = () => import("../components/Home");
const New_4G = () => import("../components/New_4G");
const Trouble_view = () => import("../components/Trouble_view");

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
  {
    path: "/Trouble_view",
    name: "Trouble_view",
    component: Trouble_view,
  },
];

export default routes;
