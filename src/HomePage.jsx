import React from 'react';
import {Button, Jumbotron,Row,Col, Image } from 'react-bootstrap';
import {FaChevronRight} from 'react-icons/fa';
import './HomePage.css';

export class HomePage extends React.Component 
{
	
	render()
	{
		return(
			<Row>
				<Col xs={{span:12, order: 2 }} lg={{span:6, order: 1 }}  >
					<Row className="text-center">
						<Col>
						</Col>
						<Col lg={10} >
							<Jumbotron className="text-lg-left bg-white" style={{fontFamily: "Roboto,sans-serif"}}>
								<h1 className="heading-1" style={{lineHeight: 1.1, fontWeight: 700}}>Take a Selfie,</h1>
								<h1 className="heading-2" style={{fontWeight: 400}}>Make countless Stickers and GIFs</h1>
								<br/>
								<br/>
								<Button href="/createBobble" variant="link" style={{textDecoration: "none", borderRadius: "12px",padding: "15px 20px",backgroundColor: "rgb(255, 152, 0)",color: "white",boxShadow: "rgba(68, 68, 68, 0.4) 5px 5px 5px"}}>
									Create your bobble	
									<span className="ml-3">
										<FaChevronRight />
									</span>
								</Button>
							</Jumbotron>
						</Col>
					</Row>
				</Col>
				<Col xs={{span:12, order: 1 }} lg={{span:6, order: 2 }}  >
					<Image src="Images/create-bobble.jpg" fluid/>
				</Col>
			</Row>
		)
	}
}