// 按需全局引入 vant组件
import Vue from 'vue'
import {
  NavBar,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Sticky,
  Button,
  Icon,
  List,
  Tab,
  Tabs,
  Col,
  Row,
  Search,
  Sidebar,
  SidebarItem,
  Field,
  Checkbox,
  CheckboxGroup,
  Notify,
  Lazyload,
  Tag,
  GoodsAction, GoodsActionIcon, GoodsActionButton,
  Dialog,
  SwipeCell,
  Stepper,
  SubmitBar,
  Card,
  Area,
  AddressEdit, 
  AddressList,
  CountDown,
  ActionSheet,
  RadioGroup, Radio,
  PasswordInput, NumberKeyboard ,
  Empty ,
  Divider,
  PullRefresh
} from 'vant';


Vue.use(PullRefresh);
Vue.use(Divider);
Vue.use(Empty);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);

Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(ActionSheet);
Vue.use(CountDown);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(Card);
Vue.use(SubmitBar);
Vue.use(Stepper);
Vue.use(SwipeCell);
Vue.use(Dialog);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Tag);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Notify);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Field);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Sticky);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(AddressList);