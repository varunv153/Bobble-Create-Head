import React from 'react';
import {UploadImage} from './UploadImage.jsx';
import {Card, Container,Row,Image } from 'react-bootstrap';
import axios from "axios";
var fs = require('fs')
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
			gif:"",
			err:""
		}
		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.handleImageCapture = this.handleImageCapture.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClickMale = this.handleClickMale.bind(this);
		this.handleClickFemale = this.handleClickFemale.bind(this);
	}
	dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

	handleImageUpload(event)
	{
		event.preventDefault();
		if (event.target.files && event.target.files[0]) 
		{
			let reader = new FileReader();
			reader.onload = (e) => {
				this.setState({uploadedImage: e.target.result});
	    	};
	    	reader.readAsDataURL(event.target.files[0]);
		}
		this.setState({
			isImageUploaded: true
		})
	}
	handleImageCapture(capturedImage)
	{
		this.setState({
			uploadedImage: capturedImage,
			isImageUploaded: true
		})
	}
	async handleSubmit()
	{
		const form  = new FormData();
	    form.append( 'imageBase64', this.state.uploadedImage.split(',')[1] );
	    form.append('gender', this.state.selectedGender)
	    const bobbleUrl ='https://bobblification.bobbleapp.me/api/v3/bobbleHead';
	    try
	    {
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
		catch(err)
		{
			this.setState({err:JSON.stringify(err)});
		}
		
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
		
		const form  = new FormData();
	    form.append('image', this.dataURLtoFile(this.state.uploadedImage, "filename"));
	    const bobbleGifUrl ='https://gifs-content-api.bobbleapp.me/v1/gifs/4107';
	    try{
		    const result = await axios({
				method: "post",
				url: bobbleGifUrl,
				data: form,
				headers: { "Content-Type": "multipart/form-data" },
			})
			this.setState({err:JSON.stringify(result.data.url)});
		}
		catch(err)
		{
			this.setState({err:JSON.stringify(err)});
		}
	}
	render()
	{
		let contentInsideCard, imageStep;
		if(!this.state.isImageUploaded)
		{
			contentInsideCard =(
				<div>
					<Image style={{maxWidth: '400px'}} src="Images/instructions.png"/>
					<p style={{fontSize: '22px'}} className="text-center my-4">Pose with a Straight Face</p>
					<UploadImage onCapture={(capturedImage)=>this.handleImageCapture(capturedImage)} onChange={(event)=>this.handleImageUpload(event)} />
				</div>
			);
			imageStep = "Images/step-1.png";
		}
		else if(!this.state.isFormSubmitted)
		{

			contentInsideCard = (
				<Container className="text-center">
					<div>
						<Image className="mb-4" style={{width: "196px"}} src={this.state.uploadedImage} alt="Uploaded" roundedCircle/>
					</div>
					<Image style={{width: "128px"}} className="mx-4 gender-icon" src="Images/male-icon.png" onClick={this.handleClickMale}/>
					<Image style={{width: "128px"}} className="mx-4 gender-icon" src="Images/female-icon.png" onClick={this.handleClickFemale}/>
				</Container>
			);
			imageStep = "Images/step-2.png";
		}
		else
		{
			this.createGif();
			contentInsideCard = (
				<div>
					<Image src={this.state.bobbleHead}/>
				</div>
			);
		}
		return(
			<Container>
				{this.state.err?<p>{this.state.err}</p>:null}
				<Row className="justify-content-center">
					<Card className="shadow">
						<Row className="justify-content-center">
							<Image className="my-4 mx-auto" style={{maxWidth: '300px'}} src={imageStep}/>
						</Row>
						<Row className="justify-content-center">
							<Container className="my-4 mx-4">
								{contentInsideCard}
							</Container>
						</Row>
					</Card>
				</Row>
			</Container>
		);
	}
}