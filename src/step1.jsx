import React from 'react';
import {UploadImage} from './UploadImage.jsx';
import {Image } from 'react-bootstrap';

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
			<div>
				<Image style={{maxWidth: '400px'}} src="Images/instructions.png"/>
				<p style={{fontSize: '22px'}} className="text-center my-4">Pose with a Straight Face</p>
				<UploadImage onCapture={(capturedImage)=>this.props.onGettingImage(capturedImage)} onChange={(event)=>this.handleImageUpload(event)} />
			</div>
		);
	}
}