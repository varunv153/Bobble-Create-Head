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
			selectedGender: "",
			bobbleHead:"",
			gif:[],
			err:""
		}
		this.maleGifIDs = [4107,4129,4079,199,214,2907,2910];
		this.setImageState = this.setImageState.bind(this);
	}
	setImageState(image)
	{
		this.setState({
			uploadedImage: image,
			isImageUploaded: true
		})
	}
	async setBobbleHead(err, gender, result)
	{
		if(err)
		{
			this.setState({
				err:JSON.stringify(err)
			})
			return;
		}
		this.setState({
			selectedGender: gender,
			isFormSubmitted: true,
			bobbleHead: 'data:image/png;base64,'+result.data.bobbleHead
		})
	}
	async createGif()
	{
		
		const form  = new FormData();
	    form.append('image', dataURLtoFile(this.state.uploadedImage, "filename"));
	    for(let i of this.maleGifIDs)
	    {
		    const bobbleGifUrl ='https://gifs-content-api.bobbleapp.me/v1/gifs/'+i;
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
			contentInsideCard = <Step2 uploadedImage={this.state.uploadedImage} handleSubmit={(err,gender,result)=>this.setBobbleHead(err,gender,result)} />;
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