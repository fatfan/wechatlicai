import React,{Component,ReactDOM} from "react";

import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink } from 'react-router-dom';
import router from "../router/router.js"


export default class App extends Component{
	render(){
		return (<div>
			<h1>React Router Demo</h1>
			<ul>
				{
					router.map((value,index)=>{
						return (<li key={index}><Link to={value.path}>{value.title}</Link></li>)
					})
				}

			</ul>
			<a>11sdaaaaaaas3sd</a>
		</div>);
	}
}