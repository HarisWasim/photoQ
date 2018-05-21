var port = 8888;

// import React from 'react';
// import { render } from 'react-dom';

/* This array is just for testing purposes.  You will need to 
   get the real image data using an AJAX query. */

// const photos = [
// {src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/A%20Torre%20Manuelina.jpg", width: 574, height: 381 },
// {src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Uluru%20sunset1141.jpg", width: 500 , height: 334 },
// {src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Sejong tomb 1.jpg", width: 574, height: 430},
// {src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Serra%20da%20Capivara%20-%20Painting%207.JPG", width: 574, height: 430},
// {src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Royal%20Palace%2c%20Rabat.jpg", width: 574, height: 410},
// {src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Red%20pencil%20urchin%20-%20Papahnaumokukea.jpg", width: 574 , height: 382 }
// ];



// A react component for a tag
class Tag extends React.Component {

    render () {
		return (
			<p className="tagText">{this.props.text}</p>
		);
	}
}

// A react component for controls on an image tile
class TileControl extends React.Component {

    render () {
		const selected = this.props.selected;
		const src = this.props.src;
		let photoName = src.split("/").pop();
		photoName = photoName.split('%20').join(' ');
		if(!this.props.selected) {
			return null;
		}

		return (
			<div className={selected ? 'selectedControls' : 'normalControls'}>
				<Tag text={photoName} />
			</div>
		);
	}		
};




class ImageTile extends React.Component {
	
	render() {
		const _photo = this.props.photo;

		return (
			<div
			className="tile"
			style={{ display: 'inline-block', margin: this.props.margin, width: _photo.width, position: 'relative'}}
			onClick={e => this.props.onClick(e, { index: this.props.index, photo: _photo })}
			>
				<div style={{position: 'absolute', top: 0, left: 0 }}>
					<TileControl
						src={_photo.src}
						selected={_photo.selected}
					/>
				</div>

				<img
					src={_photo.src}
					width={_photo.width}
					height={_photo.height}
					className={this.props.selected ? 'selected' : 'normal'}
				/>
			</div>
		);
	}
}
	
// The react component for the whole image gallery
// Most of the code for this is in the included library
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { photos: [] };
		this.selectTile = this.selectTile.bind(this);
		this.receiveImages = this.receiveImages.bind(this);
	}

	componentWillMount() {
		window.photoByNumber = () => {
			// Called when the user pushes the "submit" button 
			var num = document.getElementById("num").value;
			num = num.trim();
			var photoNum = num.split(", ");
			if (photoNum != NaN) {
				var oReq = new XMLHttpRequest();
				this.oReq = oReq;
				var endOfQuery = "";
				for(let i = 0; i < photoNum.length; i++){
					if(i === photoNum.length - 1){
						if(photoNum[i] <=988 && photoNum[i] >= 0){
							endOfQuery += photoNum[i];
							i+=1;
						}else{
							alert("That is an improper request. Please try again")
							return
						}
					}else{
						if(photoNum[i] <=988 && photoNum[i] >= 0){
							photoNum[i] = Number(photoNum[i]);
							endOfQuery += photoNum[i] + "+";
						}else{
							alert("That is an improper request. Please try again")
							return
						}
					}
				}
				var url = "http://localhost:" + port +"/query?numList=" + endOfQuery;
				console.log("Query Sent In The Form Of: " + url)
				oReq.open("GET", url);
				oReq.addEventListener("load", this.receiveImages);
				oReq.send();
			}
		} 
		
	}

	receiveImages() {
		var allPhotos = JSON.parse(this.oReq.responseText);
		var photos = [];
		for(let i = 0; i<allPhotos.length; i++){
			var imgObj = {};
			var photoName = allPhotos[i].fileName
			var photoUrl = "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/" + photoName;
			imgObj.src = photoUrl;
			imgObj.width = allPhotos[i].width;
			imgObj.height = allPhotos[i].height;
			photos.push(imgObj);
		}
		this.setState({ photos });
	}
	
	selectTile(event, obj) {
		console.log("in onclick!", obj);
		let photos = this.state.photos;
		photos[obj.index].selected = !photos[obj.index].selected;
		this.setState({ photos: Array.prototype.slice.call(photos, 0) });
	}
	
	render() {

		if(this.state.photos.length < 1) {
			return <div>Nothing Has Been Searched Yet!</div>

		} 

		return (
			<Gallery
				photos={this.state.photos}
				onClick={this.selectTile}
				ImageComponent={ImageTile}
			/>
		)
	}	
}


ReactDOM.render(<App />, document.getElementById("container"));

// 	ReactDOM.render(React.createElement(App), document.getElementById("container"));
// ReactDOM.render("<img>", document.getElementById("photoDisplay"));
			// render(<App />, document.getElementById('photoDisplay'));
		// var display = document.getElementById("photoImg");
		// display.src = photoURL;
	    // }
