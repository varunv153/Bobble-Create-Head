import React from 'react';

export class DisplayImage extends React.Component
{
	render()
	{
		return(
			<img src={this.props.uploadedImage} alt="Uploaded"></img>
		);
	}
}