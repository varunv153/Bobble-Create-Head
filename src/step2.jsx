import React from 'react';
import { Container,Image } from 'react-bootstrap';

export class Step2 extends React.Component
{
	render()
	{
		return(
			<Container className="text-center">
				<div>
					<Image className="mb-4" style={{width: "196px"}} src={this.props.uploadedImage} alt="Uploaded" roundedCircle/>
				</div>
				<Image style={{width: "128px"}} className="mx-4 gender-icon" src="Images/male-icon.png" onClick={this.props.handleClickMale}/>
				<Image style={{width: "128px"}} className="mx-4 gender-icon" src="Images/female-icon.png" onClick={this.props.handleClickFemale} />
			</Container>
		);
	}
}