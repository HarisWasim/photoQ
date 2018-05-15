var portNumber = 50232;
//haris's port number: 8888
//jose's port number: 50232

// Called when the user pushes the "submit" button 
function photoByNumber() {
	
	//ORIGINAL CODE
	var num = document.getElementById("num").value;
	num = num.trim();
	var photoNum = Number(num);

	if ( photoNum != NaN ) {
		var url = "http://server162.site:" + portNumber + "/query?num=" + photoNum;
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
		var imageUrl = "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/" + this.responseText;
			//methinks responseText is the image url
		var imgElement = document.getElementById('photoImg');
		imgElement.src = imageUrl;
	}



