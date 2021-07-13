import React from 'react';
import { Image, Row,Col,Modal, Button } from 'react-bootstrap';
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
					<Col className="text-center">
						<label for="upload" className="new-button text-center">
							<Image style={{maxWidth: '30px'}} class="mb-0" src="/Images/Cloud_Upload.png" fluid/>
							<p> Upload Photo</p>
							<input id="upload" type="file" onChange={this.props.onChange} accept="image/*"/>
						</label>
					</Col>
					<Col className="text-center">
						<label for="camera" className="new-button text-center">
							<Image style={{maxWidth: '30px'}} class="mb-0" src="/Images/camera.png" fluid/>
							<p>Open Camera</p>
							<Button id="camera" className="d-none" onClick={()=>this.handleShowModal()}>Camera</Button>
						</label>
					</Col>
				</Row>
				<Modal show={this.state.showModal}>
					<Modal.Header><Modal.Title>Face Capture</Modal.Title></Modal.Header>
					<Modal.Body>
						<CustomWebcam onCapture={(capturedImage)=>this.props.onCapture(capturedImage)}/>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={()=>this.handleShowModal() }>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}