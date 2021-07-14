import React from 'react';
import {Link } from "react-router-dom";
import {Jumbotron,Row,Col, Image } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FaChevronRight} from 'react-icons/fa';

export class HomePage extends React.Component 
{
	render()
	{
		return(
			<Row>
				<Col>
					<Jumbotron className="bg-white" style={{fontFamily: "Roboto,sans-serif"}}>
						<h1 style={{color: "rgb(65, 65, 65)",fontSize: "42px", lineHeight: 1.1, fontWeight: 700}}>Take a Selfie,</h1>
						<h1 style={{fontSize: "28px", fontWeight: 400}}>Make countless Stickers and GIFs</h1>
						<br/>
						<br/>
						<Link to="/createBobble" className="mt-4">
							<p className="d-flex flex-row" style={{fontSize: "1rem", borderRadius: "12px",textDecoration: "none", width: "210px",padding: "15px 20px",backgroundColor: "rgb(255, 152, 0)",color: "white",boxShadow: "rgba(68, 68, 68, 0.4) 5px 5px 5px"}}>
								Create your bobble	
								<span className="ml-3">
									<FaChevronRight />
								</span>
							</p>
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