import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Card,
  Collapse,
  CollapseItem,
  Table,
  TableColumn,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  Form,
  FormItem,
  Input,
  Avatar,
  Dialog,
  Link,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Card)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Dialog)
Vue.use(Link)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
