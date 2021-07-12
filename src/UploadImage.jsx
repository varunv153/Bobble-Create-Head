import React from 'react';
import {Modal, Button } from 'react-bootstrap';
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
				<input type="file" onChange={this.props.onChange} accept="image/*"/>
				<Button onclickvariant="secondary" onClick={()=>this.handleShowModal()}>Camera</Button>
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