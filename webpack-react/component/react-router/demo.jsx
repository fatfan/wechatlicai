import React,{Component,ReactDOM} from "react";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink } from 'react-router-dom';

export class Index extends Component{
	render(){
		return (<div>首页</div>);
	}
}
export class Demo1 extends Component{
	render(){
		return (<div>ASDAASD</div>);
	}
}

export class Demo2 extends Component{
	render(){
		return (<Link to="/">zzzzzzzzzzzzzzzzzz</Link>);
	}
}