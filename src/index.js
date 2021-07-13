import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {HomePage} from './HomePage.jsx';
import {CreatePage} from './CreatePage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component 
{
	render()
	{
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route exact path="/createBobble">
						<CreatePage />
					</Route>
				</Switch>
			</Router>	
		);
	}
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);