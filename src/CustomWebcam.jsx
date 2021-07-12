import Webcam from "react-webcam";
import {Container} from 'react-bootstrap';
import React from 'react';

export class CustomWebcam extends React.Component
{
	constructor(props){
        super(props);
        this.state = { screenshot: null }
        // this can be moved directly to the onClick event
        // this.screenshot = this.screenshot.bind(this);
    }

	screenshot() {
        // access the webcam trough this.refs
        var screenshot = this.refs.webcam.getScreenshot();
        this.setState({screenshot: screenshot});
	}
	render()
	{
		return(
			<Container>
				<Webcam mirrored/>
			</Container>
		)
	}
}