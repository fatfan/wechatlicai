import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink } from 'react-router-dom';

import "../style/index.less";

//引入组件
import Index from "../component/index.jsx";


export default class App extends Component{
	render(){
		return (<div>
			<Index></Index>
		</div>);
	}
	componentDidMount(){

	}

}

