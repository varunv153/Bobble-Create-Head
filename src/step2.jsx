import React from 'react';
import { Container,Image } from 'react-bootstrap';
import axios from "axios";

export class Step2 extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleClickMale = this.handleClickMale.bind(this);
		this.handleClickFemale = this.handleClickFemale.bind(this);
	}
	async handleSubmit(gender)
	{
		const form  = new FormData();
	    form.append( 'imageBase64', this.props.uploadedImage.split(',')[1] );
	    form.append('gender', gender)
	    const bobbleUrl ='https://bobblification.bobbleapp.me/api/v3/bobbleHead';
	    try
	    {
    		const result = await axios({
				method: "post",
				url: bobbleUrl,
				data: form,
				headers: { "Content-Type": "multipart/form-data" },
			})
			this.props.handleSubmit(null, gender, result);
		}
		catch(err)
		{
			this.props.handleSubmit(err);
		}
	}
	handleClickMale(event)
	{
		this.handleSubmit("male");
	}
	handleClickFemale(event)
	{
		this.handleSubmit("female");
	}
	render()
	{
		return(
			<Container className="text-center">
				<div>
					<Image className="mb-4" style={{width: "196px"}} src={this.props.uploadedImage} alt="Uploaded" roundedCircle/>
				</div>
				<Image style={{width: "128px"}} className="mx-4 gender-icon" src="Images/male-icon.png" onClick={this.handleClickMale}/>
				<Image style={{width: "128px"}} className="mx-4 gender-icon" src="Images/female-icon.png" onClick={this.handleClickFemale} />
			</Container>
		);
	}
}