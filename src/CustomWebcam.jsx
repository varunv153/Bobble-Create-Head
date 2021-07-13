import Webcam from "react-webcam";
import {Button, Container} from 'react-bootstrap';
import React from 'react';

export class CustomWebcam extends React.Component
{
	constructor(props){
        super(props);
        // this can be moved directly to the onClick event
         this.screenshot = this.screenshot.bind(this);
    }
	screenshot() {
        // access the webcam trough this.refs
        var screenshot = this.refs.webcam.getScreenshot();
        this.props.onCapture(screenshot);
	}
	render()
	{
		return(
			<Container className="text-center">
				<div>
					<Webcam videoConstraints={{"width": 360,"height": 360}} screenshotFormat="image/jpeg" mirrored ref='webcam'/>
				</div>
				<div>
					<br />
					<Button variant="primary" onClick={()=>this.screenshot()}>Capture</Button>
				</div>
			</Container>
		)
	}
}