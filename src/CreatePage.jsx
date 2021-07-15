import React from 'react';
import {Step1} from './step1.jsx';
import {Step2} from './step2.jsx';
import {Col,Card, Container,Row,Image } from 'react-bootstrap';
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
			contentInsideCard = this.state.gif.map((i,index)=>{
				return (<Image className="p-3" style={{width: "150px"}} src={i} />);
			});

			let totalLength=0;
			if(this.state.gender=='male')
				totalLength = this.maleGifIDs.length + this.maleStickerIds.length;
			else if(this.state.gender=='female')
				totalLength = this.femaleGifIDs.length + this.femaleStickerIds.length;
			for(let i=contentInsideCard.length;i<totalLength;++i)
				contentInsideCard.push(  <Image className="p-3" style={{width: "150px"}} src='Images/sample-sticker.jpg' /> );

			contentInsideCard = (
				<div className="text-left" fluid>
					{contentInsideCard}
				</div>
			);
		}

		return(
			<Row className="justify-content-center m-0" style={{fontFamily:"Roboto,sans-serif"}}>
				<Col className="my-5 px-0" lg={6} md={8} xs={12}>
					{this.state.err?<p>{this.state.err}</p>:null}
					<Card className="pt-4 px-2" style={{borderRadius:"2%",width:"100%", webkitBoxShadow:"0 2px 4px 0 rgb(0 0 0 / 50%)"}}>
						<div className="text-center mx-auto" style={{maxWidth:"300px"}}>
							<Image src={imageStep} fluid/>
						</div>
						<Container className="px-0 py-4 text-center">
							{contentInsideCard}
						</Container>
					</Card>
				</Col>
			</Row>
		);
	}
}