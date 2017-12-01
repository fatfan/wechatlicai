import React, {Component} from 'react'
import {
  HashRouter as Router,
  StaticRouter,
  Route,
  Link,
  hashHistory,
  NavLink
} from 'react-router-dom'

import style from './tabs.less'

const TabItem = (props) => (
  <NavLink className={style['tab-item']} activeClassName={style['tab-item-active']} to={props.to} exact>{props.name}</NavLink>
)

// const Tabs = (props) => (
//   <footer className={style['tab']}>
//     <TabItem to="/" name="首页" />
//     <TabItem to="/invest" name="投资" />
//     <TabItem to="/mine" name="我的" />
//     <TabItem to="/more" name="更多" />
//     {/* <Link className={style["tab-item"] + (props.cur == "0" ? " tab-item-active" : "")} to="/">首页</Link>
//         <Link className={style["tab-item"] + (props.cur == "1" ? " tab-item-active" : "")} to="/invest">投资</Link>
//         <Link className={style["tab-item"]+ (props.cur == "2" ? " tab-item-active" : "")} to="/mine">我的</Link>
//         <Link className={style["tab-item"]+ (props.cur == "3" ? " tab-item-active" : "")} to="/more">更多</Link> */}
//   </footer>

// )
// export default Tabs

export default class Tabs extends Component {
  render () {
    return (
      <footer className={style['tab']}>
        <TabItem to="/" name="首页" />
        <TabItem to="/invest" name="投资" />
        <TabItem to="/mine" name="我的" />
        <TabItem to="/more" name="更多" />
      </footer>
    )
  }
  constructor (prop) {
    super(prop)
    this.state = {
      username: '',
      password: '',
      enableLogin: false
    }
  }
  componentDidMount () {
    document.body.style.paddingBottom = '1.2rem'
  }
  componentWillUnmount () {
    document.body.style.paddingBottom = '0'
  }
}
