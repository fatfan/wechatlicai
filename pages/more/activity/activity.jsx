import React from "react";
import { HashRouter as Router, StaticRouter, Route, Link, hashHistory, NavLink, IndexRoute } from 'react-router-dom';
//引入样式
// import "./more.less";

//引入组件
import Header from "../../../component/cmn/header/header.jsx";
// import Tabs from "../../../component/cmn/tabs/tabs.jsx";
const Activity = ({ match }) => (
    <div>
        <main style={{ marginTop: "0.88rem" }}>
            <h2>活动专区详情页</h2>
            <Link className="menu-item" to="/more">返回</Link>
        </main>
    </div>

)
export default Activity