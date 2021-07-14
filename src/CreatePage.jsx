import React from 'react';
import {Step1} from './step1.jsx';
import {Step2} from './step2.jsx';
import {Card, Container,Row,Image } from 'react-bootstrap';
import axios from "axios";
var FormData = require('form-data');

function dataURLtoFile(dataurl, filename) 
{
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), 
		n = bstr.length, 
		u8arr = new Uint8Array(n);
	while(n--)
		u8arr[n] = bstr.charCodeAt(n);
	return new File([u8arr], filename, {type:mime});
}
export class CreatePage extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state ={
			isImageUploaded: false,
			isFormSubmitted: false,
			isGifGot: false,
			uploadedImage: "",
			selectedGender: "male",
			bobbleHead:"",
			gif:[],
			err:""
		}
		this.maleGifIDs = [4107,4129,4079,199,214,2907,2910];
		this.setImageState = this.setImageState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClickMale = this.handleClickMale.bind(this);
		this.handleClickFemale = this.handleClickFemale.bind(this);
	}
	setImageState(image)
	{
		this.setState({
			uploadedImage: image,
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
	    form.append('image', dataURLtoFile(this.state.uploadedImage, "filename"));
	    for(let i of this.maleGifIDs)
	    {
		    const bobbleGifUrl ='https://gifs-content-api.bobbleapp.me/v1/gifs/'+i;
		    console.log(i);
		    try
		    {
			    const result = await axios({
					method: "post",
					url: bobbleGifUrl,
					data: form,
					headers: { "Content-Type": "multipart/form-data" },
				})
				
				this.setState( (state,props) => ({ gif:state.gif.concat(result.data.url), isGifGot:true}) );
			}
			catch(err)
			{
				this.setState({err:JSON.stringify(err)});
			}
		}
	}
	render()
	{
		let contentInsideCard, imageStep;
		if(!this.state.isImageUploaded)
		{
			contentInsideCard = <Step1 onGettingImage={(capturedImage)=>this.setImageState(capturedImage)}/>;
			imageStep = "Images/step-1.png";
		}
		else if(!this.state.isFormSubmitted)
		{
			contentInsideCard = <Step2 uploadedImage={this.state.uploadedImage} handleClickMale={this.handleClickMale} handleClickFemale={this.handleClickFemale} />;
			imageStep = "Images/step-2.png";
		}
		else if(!this.state.isGifGot)
		{
			contentInsideCard = (
				<div>
					<Image src={this.state.bobbleHead}/>
				</div>
			);
			this.createGif();
		}
		else
		{
			contentInsideCard = this.state.gif.map((i)=>{
				return( <Image style={{width: "128px"}} src={i} />);
			});
			console.log(contentInsideCard);
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