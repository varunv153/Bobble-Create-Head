import React from 'react';
import {UploadImage} from './UploadImage.jsx';
import {DisplayImage} from './Display_Image.jsx';
import {Button } from 'react-bootstrap';
import axios from "axios";
var FormData = require('form-data');

export class CreatePage extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state ={
			uploadedImage: "",
			selectedGender: "male",
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleImageUpload(event)
	{
		if (event.target.files && event.target.files[0]) 
		{
			let reader = new FileReader();
			reader.onload = (e) => {
				this.setState({uploadedImage: e.target.result});
	    	};
	    	reader.readAsDataURL(event.target.files[0]);
		}
	}
	async handleSubmit(event) 
	{
	    event.preventDefault();
	    const form  = new FormData();
	    form.append('imageBase64', this.state.uploadedImage.slice(22));
	    form.append('gender', this.state.selectedGender)
	    form.append('facetone', '#fcb05f')
	    const bobbleUrl ='https://bobblification.bobbleapp.me/api/v3/bobbleHead';
	    const result = await axios({
			method: "post",
			url: bobbleUrl,
			data: form,
			headers: { "Content-Type": "multipart/form-data" },
		})
		console.log(result);
		this.setState({
			uploadedImage: 'data:image/png;base64,'+result.data.bobbleHead
		})
	}

	render()
	{
		return(
			<form onSubmit={this.handleSubmit}>
				<UploadImage onChange={(event)=>this.handleImageUpload(event)} />
				<DisplayImage uploadedImage={this.state.uploadedImage}/>
				<Button as="input" type="submit" value="Submit" />
			</form>
		);
	}
}