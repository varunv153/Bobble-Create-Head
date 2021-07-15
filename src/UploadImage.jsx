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
							<Image className="pt-2" style={{maxWidth: '57px'}} class="mb-0" src="/Images/Cloud_Upload.png" fluid/>
							<p style={{fontSize: "13.5px", fontWeight: "lighter"}} className="mb-1"> Upload Photo</p>
							<input id="upload" type="file" onChange={this.props.onChange} accept="image/*"/>
						</label>
					</Col>
					<Col className="text-center">
						<label id="openCamera" for="camera" className="new-button text-center">
							<Image className="pt-2" style={{maxWidth: '36px'}} class="mb-0" src="/Images/camera.png" fluid/>
							<p style={{fontSize: "13.5px", fontWeight: "lighter"}} className="mb-1">Click Photo</p>
							<Button id="camera" className="d-none pb-0" onClick={()=>this.handleShowModal()}>Camera</Button>
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