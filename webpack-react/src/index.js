import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";

import router from "../router/router.js"

import App from "./app.jsx";
import {Demo1,Demo2,Index} from "../component/react-router/demo";
import Demo from "../component/demo1/demo1";

import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink } from 'react-router-dom';

//const defaultRender = ()=>{
//	return (
//		<BrowserRouter basename="/">
//			<div>
//				12asdasdasd
//				<App/>
//				{
//					router.map((value,index)=>{
//						return (<Route key={index} exact path={value.path} component={value.component}></Route>)
//					})
//				}
//			</div>
//		</BrowserRouter>
//	)
//};
//reactDOM.render(
//	defaultRender(), 
//	document.getElementById('contain')
//);

reactDOM.render(
	<Demo/>,
	document.getElementById('contain')
);