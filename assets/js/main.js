// @@Author Sam Hill
// @@website http://www.samjhill.com


console.log("main.js loaded");
var api_key = 'f63ef15c14a30593c4dabb929a422329';
var authURL = 'http://www.last.fm/api/auth/?api_key=';
var rootURL = 'http://ws.audioscrobbler.com/2.0/';
var response = null;
var complete = false;
var iteration = 0;
var artistImageLoaded = false;

// @@values - Array - this will be used for each Option
// @@labelText - String - label for the item
// returns a DIV element. Inside is a select, with given values for each Option
function createSelect( values ){
	
	console.log('iteration: ' + iteration );
	var newSelect = document.createElement( 'select' );
	
	newSelect.onchange = function(){
		//print the value that's been selected
	    var value = newSelect.options[newSelect.selectedIndex].value;
	    console.log(value + ' selected');
		
		//first iteration, we want to look at top artists for the selected tag
		if( iteration == 1 ){
			console.log( ' iteration 1, getting top artists for tag ' + value );
	    	ajaxParse('artist', 'tag.gettopartists', '&tag=' + value, 'name');
		}
		//second iteration, we want to get top tracks for selected artist
		if( iteration == 2 ){
			console.log( ' iteration 2, getting top tracks for artist ' + value );
	    	ajaxParse('top songs', 'artist.gettoptracks', '&artist=' + value, 'name');
			
			//get array of images of artist
			var artistImage = getArtistImage( value );
			
		}
		
		
		
	}
	
	//fill the rest of the boxes with the set of labels
	for( var i = 0; i < values.length; i++ ){
		var option = document.createElement( 'option' );
		option.value = values[i];
		option.text = values[i];
		newSelect.appendChild( option );
	}
	
	var newDiv = document.createElement( 'div' );
	newDiv.appendChild(newSelect);
	
	document.getElementById('main').appendChild( newDiv );
	iteration++;
	
	
}

function createList(){
    
}

//basic ajax GET call
function ajaxGet( url ){
	response = null;
	complete = false;
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	} else {
	    // code for IE6, IE5
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	    {
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		  {
		    response = xmlhttp.responseXML;
		    //console.log( 'response inside ajaxGet: ' + response );
			complete = true;
		    return response;
		  }
		else{ return 'failed'; }
	    }
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	
}

// @@label - String - the textual label for the item
// @@method - String - one of the many methods for the api: http://www.last.fm/api/intro
// @@searchValue - String - band, song, etc. search value
// @@ tagName - the XML tag that surrounds the item you'd like to be returned
//
// goes out to Last.fm with a request, then returns a selectDiv
function ajaxParse( label, method, searchValue, tagName){
	if( searchValue == ''){
		ajaxGet(rootURL +  '?method='+ method + '&api_key=' + api_key);
	}
	else{
		ajaxGet(rootURL +  '?method='+ method + searchValue + '&api_key=' + api_key);
	}
	    
	var waitForAjax = setInterval(function(){timerAjax()},500);

	function timerAjax()
	{
		//console.log('complete is now false, waiting...');
		if(complete == true){
			//sort through all the tags, grab them by name
			console.log('complete is now true; lets grab them by tagName');
			names = response.getElementsByTagName( tagName );
			var array = new Array();
			//make the label the first item in the array
			//array.push( label );
			//add tags to array
			if( iteration == 0 ){
				array.push( 'genre' );
				for(var i = 0; i < 10; i++){
				  array.push( names[i].textContent );
				}
			}
			if( iteration == 1 ){
				array.push( 'artist' );
				for(var i = 0; i < 10; i++){
				  array.push( names[i].textContent );
				}
				
				
			}
			// if iteration is 1, we have to grab every other item, because there are artist names mixed in with track names
			if( iteration == 2){
				array.push( 'top songs' );
				for(var i = 0; i < 20; i += 2){
			  	array.push( names[i].textContent );
				}
			}
			complete = false;
			//console.log('ajaxParse array size: ' + array.length );
			var selectDiv = createSelect( array );
			return selectDiv;
		}
	}
}

function getArtistImage( artistName ){
	ajaxGet(rootURL +  '?method=artist.getinfo&artist=' + artistName + '&api_key=' + api_key);
	var wait = setInterval(function(){waitForAjax()},500);

	function waitForAjax()
	{
		while( artistImageLoaded == false ){
		var artistImages = response.getElementsByTagName( 'image' );
		var urlArray = new Array();
		//get first five images.
		//should result in small, med, large, x-lage, and mega 
		for( var i = 0; i < 7; i++){
			console.log( artistImages[i].textContent );
			urlArray.push( artistImages[i].textContent );
		}
		console.log('number of artist images: ' + urlArray.length);
		//set background to one of the images
		//according to the output, item 4 is the Mega size image
		setBackground( urlArray[3] );
		artistImageLoaded = true;
		return urlArray;
		}
	}
}

function setBackground( url ){
	//document.body.style.backgroundImage = "url('" + url + "') no-repeat center center fixed";
	console.log('background set to ' + url);
	document.body.style.backgroundImage = "url('" + url + "')";
	document.body.style.backgroundSize = "cover";
	
}