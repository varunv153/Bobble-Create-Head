import React from 'react';
import {Container, Image, Row,Col,Modal, Button } from 'react-bootstrap';
import {CustomWebcam} from './CustomWebcam.jsx';

export class UploadImage extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			showModal: false
		}
	}
	handleShowModal()
	{
		this.setState((state,props)=>({
			 showModal : !state.showModal
		}));
	}
	
	render()
	{

		return(
			<div>
				<Row>
					<Col>
						<label for="upload" className="new-button text-center">
							<Image style={{maxWidth: '30px'}} class="mb-0" src="/Images/Cloud_Upload.png" fluid/>
							<p> Upload Photo</p>
							<input id="upload" type="file" onChange={this.props.onChange} accept="image/*"/>
						</label>
					</Col>
					<Col>
						<Button onclickvariant="secondary" onClick={()=>this.handleShowModal()}>Camera</Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal}>
					<Modal.Header><Modal.Title>Face Capture</Modal.Title></Modal.Header>
					<Modal.Body>
						<CustomWebcam />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={()=>this.handleShowModal()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}