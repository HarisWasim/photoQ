var portNumber = 50232;

// Called when the user pushes the "submit" button 
function photoByNumber() {
	
	//ORIGINAL CODE
	var num = document.getElementById("num").value;
	num = num.trim();
	var photoNum = Number(num);

	if ( photoNum != NaN ) {
		var photoURL = photoURLArray[photoNum].url;
		var display = document.getElementById("photoImg");
		display.src = photoURL;
	}
	
	//NEW CODE

	//this is verbatime from lec-5-9.pdf
	var oReq = new XMLHttpRequest();
	var url = "query?num="+num;
	oReq.open("GET",url);
		//I assume that this incomplete-looking  url
		// is ok because it's to our own local machine.
	oReq.addEventListener("load",respCallback);
	oReq.send();

	//this function diverges from lex-5-9.pdf
	function respCallback()
	{
		var imageUrl = oReq.responseText;
			//methinks responseText is the image url
		var imgElement = document.getElementById('photoImg');
		imgElement.src = imageUrl;
	}
}



