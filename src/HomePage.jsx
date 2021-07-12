import React from 'react';
import {Link } from "react-router-dom";
import {Button,Jumbotron, Container,Row,Col, Image } from 'react-bootstrap';

export class HomePage extends React.Component 
{
	render()
	{
		return(
			<Container>
				<Row>
					<Col>
						<Jumbotron className="bg-white">
							<h1>Take a selfie,</h1>
							<h2>Make countless Stickers and GIFs</h2>
							<Link to="/createBobble">
								<Button className="shadow" variant="primary">Create your bobble</Button>
							</Link>
						</Jumbotron>
					</Col>
					<Col>
						<Image src="Images/create-bobble.jpg" fluid/>
					</Col>
				</Row>
			</Container>
		)
	}
}