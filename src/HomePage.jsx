import React from 'react';
import {Link } from "react-router-dom";
import {Button,Jumbotron,Row,Col, Image } from 'react-bootstrap';

export class HomePage extends React.Component 
{
	render()
	{
		return(
			<Row>
				<Col>
					<Jumbotron className="bg-white">
						<h1>Take a Selfie,</h1>
						<h4>Make countless Stickers and GIFs</h4>
						<br/>
						<br/>
						<Link to="/createBobble" className="mt-4">
							<Button size="lg" variant="outline-light" style={{backgroundColor: "#FF9801"}} className="shadow">Create your bobble > </Button>
						</Link>
					</Jumbotron>
				</Col>
				<Col>
					<Image src="Images/create-bobble.jpg" fluid/>
				</Col>
			</Row>
		)
	}
}