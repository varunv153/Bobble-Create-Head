import axios from "axios";
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
export async function createGif()
{
	const form  = new FormData();
    form.append('image', dataURLtoFile(this.state.uploadedImage, "filename"));
    var GifIds;
    if(this.state.gender === 'male')
    	GifIds = this.maleGifIDs.slice();
    else
    	GifIds = this.femaleGifIDs.slice();
    for(let i of GifIds)
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
export async function createSticker()
{
	var StickerIds;
    if(this.state.gender === 'male')
    	StickerIds = this.maleStickerIds.slice();
    else
    	StickerIds = this.femaleStickerIds.slice();
    for(let i of StickerIds)
    {
	    const bobbleStickerUrl ='https://bobblification.bobbleapp.me/api/v3/sticker';
	    const requestBody = {
	    	"stickerId":i,
	    	"image":this.state.bobbleHead.split(',')[1],
	    	"faceFeaturePoints":this.state.bobbleHeadFullInfo.faceFeaturePoints,
	    	"gender":this.state.gender,
	    }
	    try
	    {
		    const result = await axios({
				method: "post",
				url: bobbleStickerUrl,
				data: requestBody
			})
			
			this.setState( (state,props) => ({ gif:state.gif.concat(result.data.url), isGifGot:true}) );
		}
		catch(err)
		{
			this.setState({err:JSON.stringify(err)});
		}
	}
}