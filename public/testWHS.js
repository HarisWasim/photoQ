var portNumber = 8888;


// Called when the user pushes the "submit" button 
function photoByNumber() {
	
	//ORIGINAL CODE
	var num = document.getElementById("num").value;
	num = num.trim();
	var photoNum = Number(num);
	if(photoNum>989 || photoNum <= 0){ //number is out of range and don't move forward
		console.log("STATUS: 400, BAD REQUEST - Number is out of range");
		return;
	}

	if ( photoNum != NaN ) {
		var url = "http://localhost:" + portNumber + "/query?num=" + photoNum;
		console.log(url);
		var ourRequest = new XMLHttpRequest();
		// var photoURL = photoURL[photoNum].url;
		ourRequest.open("GET", url);
		ourRequest.addEventListener("load", respCallback);
		ourRequest.send();
		// var display = document.getElementById("photoImg");
		// display.src = photoURL;
	}
}
	
	//NEW CODE
	// window.location = "http://localhost:8888/testWHS.html/query/?num=" + photoNum;
	//this is verbatime from lec-5-9.pdf
	// var oReq = new XMLHttpRequest();
	// var url = "query?num="+num;
	// oReq.open("GET",url);
	// 	//I assume that this incomplete-looking  url
	// 	// is ok because it's to our own local machine.
	// oReq.addEventListener("load",respCallback);
	// oReq.send();

	//this function diverges from lex-5-9.pdf
	function respCallback()
	{
		var num = document.getElementById("num").value;
		num = num.trim();
		var photoNum = Number(num);
		var imageUrl = "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/" + this.responseText;
			//methinks responseText is the image url
		var imgElement = document.getElementById('photoImg');
		imgElement.src = imageUrl;
	}



