import React from 'react';
import {Step1} from './step1.jsx';
import {Step2} from './step2.jsx';
import {Card, Container,Row,Image } from 'react-bootstrap';
import {createSticker, createGif} from "./GifAndStickerFunctions.jsx"

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
			gender: "",
			bobbleHead:"",
			gif:[],
			err:"",
			bobbleHeadFullInfo:""
		}
		this.maleGifIDs = [4107,4129,4079,199,214,2907,2910];
		this.femaleGifIDs=[1138,4081,3156,204,2919,1149];

		this.maleStickerIds=[12466,12547,12214,12147,12150,12088];			
		this.femaleStickerIds=[12166,12509,12097,12096,12155,12467];

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
			gender: gender,
			isFormSubmitted: true,
			bobbleHead: 'data:image/png;base64,'+result.data.bobbleHead,
			bobbleHeadFullInfo: result.data
		})
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
			createGif.apply(this);
			createSticker.apply(this);
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