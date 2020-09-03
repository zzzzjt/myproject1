import {
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Row,
  Col,
  Button,
  Pagination,
  Option,
  Table,
  TableColumn,
  Container,
  Header,
  Aside,
  Main,
  Submenu,
  MenuItem,
  Menu,
  Collapse,
  CollapseItem,
  Progress,
} from "element-ui";
const element = {
  install: function(Vue) {
    Vue.use(Breadcrumb);
    Vue.use(BreadcrumbItem);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Button);
    Vue.use(Pagination);
    Vue.use(Option);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(Menu);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Progress);
  },
};
export default element;
