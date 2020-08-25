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
  },
};
export default element;
