import React from 'react';
import {Link } from "react-router-dom";

export class HomePage extends React.Component 
{
	render()
	{
		return (
			<Link to="/createBobble">Create Bobble</Link>
		);
	}
}