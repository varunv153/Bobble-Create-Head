import React from 'react';
import {UploadImage} from './UploadImage.jsx';
import {Container ,Image } from 'react-bootstrap';
import './step1.css'

export class Step1 extends React.Component
{
	handleImageUpload(event)
	{
		event.preventDefault();
		let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (e) => {
			this.props.onGettingImage(e.target.result);
    	};
	}
	render()
	{
		return(
			<Container>
				<Image src="Images/instructions.png" fluid/>
				<p className="text-center my-4">Pose with a Straight Face</p>
				<UploadImage onCapture={(capturedImage)=>this.props.onGettingImage(capturedImage)} onChange={(event)=>this.handleImageUpload(event)} />
			</Container>
		);
	}
}