import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import {Provider}  from 'react-redux';
import {store} from './store.js';
import ToDoList from './Components/To-do/index.js'
import App from "./App";
import Header from './Components/Header/index.js'

//import Header from "./components/header";

//import PrivateRoute from "./privateRouter"
//import { Provider } from "./index";

class Router extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="container">
					<Header />
					<Switch>
						<Route exact path="/" component={App} />
						<Route exact path='/to-do' component={ToDoList} />
					</Switch>
				</div>
			</Provider>
		);
	}
}

export default withRouter(Router);
