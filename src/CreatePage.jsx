import React from 'react';
import {UploadImage} from './UploadImage.jsx';
import {DisplayImage} from './Display_Image.jsx';
import {Button, Container,Row,Col } from 'react-bootstrap';
import axios from "axios";
var FormData = require('form-data');

export class CreatePage extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state ={
			isImageUploaded: false,
			isFormSubmitted: false,
			uploadedImage: "",
			selectedGender: "male",
			bobbleHead:"",
			gif:""
		}
		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.handleSubmitImageUpload = this.handleSubmitImageUpload.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClickMale = this.handleClickMale.bind(this);
		this.handleClickFemale = this.handleClickFemale.bind(this);
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
	async handleSubmitImageUpload(event) 
	{
	    event.preventDefault();
		this.setState({
			isImageUploaded: true
		})
	}
	async handleSubmit()
	{
		const form  = new FormData();
	    form.append('imageBase64', this.state.uploadedImage.slice(22));
	    form.append('gender', this.state.selectedGender)
	    const bobbleUrl ='https://bobblification.bobbleapp.me/api/v3/bobbleHead';
	    const result = await axios({
			method: "post",
			url: bobbleUrl,
			data: form,
			headers: { "Content-Type": "multipart/form-data" },
		})
		this.setState({
			isFormSubmitted: true,
			bobbleHead: 'data:image/png;base64,'+result.data.bobbleHead
		})
	}
	handleClickMale(event)
	{
		this.setState({
			selectedGender: 'male'
		})
		this.handleSubmit();
	}
	handleClickFemale(event)
	{
		this.setState({
			selectedGender: 'female'
		})
		this.handleSubmit();
	}
	async createGif()
	{
		const blob = new Blob([this.state.bobbleHead],{
			type: "image/png"
		});
		const form  = new FormData();
	    form.append('image', blob);
	    const bobbleGifUrl ='https://gifs-content-api.bobbleapp.me/v1/gifs/4107';
	    try{
		    const result = await axios({
				method: "post",
				url: bobbleGifUrl,
				data: form,
				headers: { "Content-Type": "multipart/form-data" },
			})
			console.log(result);
		}
		catch(err){
			console.log(err);
		}
	}
	render()
	{
		if(!this.state.isImageUploaded)
		{
			return(
				<form onSubmit={this.handleSubmitImageUpload}>
					<UploadImage onChange={(event)=>this.handleImageUpload(event)} />
					<DisplayImage uploadedImage={this.state.uploadedImage}/>
					<Button as="input" type="submit" value="Submit" />
				</form>
			);
		}
		if(!this.state.isFormSubmitted)
		{
			return(
				<div>
					<DisplayImage uploadedImage={this.state.uploadedImage}/>
					<Button variant="primary" onClick={this.handleClickMale}>Male</Button>
					<Button variant="primary" onClick={this.handleClickFemale}>Female</Button>
				</div>
			);
		}
		this.createGif();
		return(
			<div>
				<DisplayImage uploadedImage={this.state.bobbleHead}/>
			</div>
		);
	}
}