import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import '@/assets/icon/iconfont.css';
import Highlight from './utils/highlight.js';

import {
  Button,
  Select,
  Row,
  Header,
  Main,
  Container,
  Footer,
  Aside,
  Menu,
  Col,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Icon,
  RadioGroup,
  RadioButton,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Dialog,
  Form,
  FormItem,
  Input,
  Radio,
  DatePicker,
  Pagination
} from 'element-ui';

Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Main)
Vue.use(Header)
Vue.use(Container)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Col)
Vue.use(Submenu)
Vue.use(Icon)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Highlight)


Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
