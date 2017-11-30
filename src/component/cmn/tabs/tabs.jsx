import React from 'react';
import {
  HashRouter as Router,
  StaticRouter,
  Route,
  Link,
  hashHistory,
  NavLink
} from 'react-router-dom'
import styles from './tabs.less';
const TabItem = (props) => (
  <NavLink className={styles['tab-item']} activeClassName={styles['tab-item-active']} to={props.to} exact>{props.name}</NavLink>
)
// import Index from "../../../pages/index/index.jsx";
// import Invest from "../../../pages/invest/invest.jsx";
// import Mine from "../../../pages/mine/mine.jsx";
// import More from "../../../pages/more/more.jsx";
const Tabs = (props) => (
  <footer>
    <TabItem to="/" name="首页" />
    <TabItem to="/invest" name="投资" />
    <TabItem to="/mine" name="我的" />
    <TabItem to="/more" name="更多" />
    {/* <Link className={style["tab-item"] + (props.cur == "0" ? " tab-item-active" : "")} to="/">首页</Link>
        <Link className={style["tab-item"] + (props.cur == "1" ? " tab-item-active" : "")} to="/invest">投资</Link>
        <Link className={style["tab-item"]+ (props.cur == "2" ? " tab-item-active" : "")} to="/mine">我的</Link>
        <Link className={style["tab-item"]+ (props.cur == "3" ? " tab-item-active" : "")} to="/more">更多</Link> */}
  </footer>

)
export default Tabs
