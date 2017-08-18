import React,{Component,ReactDOM} from "react";

export default class Demo extends Component{
	render(){
		return (<div ref="aaa">
			<div>1</div>
			{this.state.name}
			<Child propData="这是我传递的数据" callback={this.getChildData}></Child>
		</div>)
	}
	constructor(){
		super()
		this.state = {
			name:"这个是默认的数据"
		}
	}

	getChildData=(value)=>{
		//alert(value)
		this.setState({
			name:value
		})
	}

}

export class Child extends Component{
	render(){
		return (<div ref="aaa">
			{this.state.name}<br/>
			{this.props.propData}
		</div>)
	}
	constructor(){
		super()
		this.state = {
			name:"这个是默认的数据",
			childtoparent:"这个数据是从子组件过来的"
		}
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.props.callback(this.state.childtoparent);
	}
}