// @@Author Sam Hill
// @@website http://www.samjhill.com

var api_key = 'f63ef15c14a30593c4dabb929a422329';
var authURL = 'http://www.last.fm/api/auth/?api_key=';
var rootURL = 'http://ws.audioscrobbler.com/2.0/';

//response and complete are used to check the AJAX calls 
var response = null;
var complete = false;
var tagsList = (['zero'],['one'],['two']);
var isLookUpComplete = false;
var artistImageLoaded = false;

function main(){
	//local storage detection courtesy of http://mathiasbynens.be/notes/localstorage-pattern
	// Feature detect + local reference
	var storage = (function() {
		  var uid = new Date,
			  result;
		  try {
			localStorage.setItem(uid, uid);
			result = localStorage.getItem(uid) == uid;
			localStorage.removeItem(uid);
			return result && localStorage;
		  } catch(e) {}
		}());
	
	if (storage) {
	  localStorage.artists = "";
	}
	else{
		 //redirect user to a new browser
	    alert("Your current internet browser isn't supported. Try again with a new browser!");
	  	window.location = "https://www.google.com/intl/en/chrome/browser/";
	}
	  
	//first, let's find the most popular tags
	lookUp( 'tags', 'tag.getTopTags', '', 'name' );
	
	var waitForLookUp = setTimeout(function(){timerAjax()},1000);

	function timerAjax()
	{
		if( isLookUpComplete == true ){
			//
			//SELECT 1 - TAGS
			//
			//create a Select based on the tags we found
			var newSelect = createSelect( tagsList );			
			//append it to the body
			document.body.appendChild(newSelect);
			
			//look up the newly appended item
			select = document.getElementById("tags-select");
			//watch for change
			select.onchange = function(){
				if(document.getElementById("artist-select")){
					var artistSel = document.getElementById("artist-select");
					artistSel.parentNode.removeChild(artistSel);
				}
				if(document.getElementById("songs-div")){
					var songsDiv = document.getElementById("songs-div");
					songsDiv.parentNode.removeChild(songsDiv);
				}
				
				
				//look up info for next select creation
				lookUp('artist','tag.getTopArtists&tag=', select.options[select.selectedIndex].text, 'name');
				var waitForLookUp = setTimeout(function(){timerAjax()},1000);

				function timerAjax()
				{
					if( isLookUpComplete == true ){
						
						//
						//SELECT 2 - ARTISTS
						//
						document.body.appendChild(document.createElement( "br" ));
						//create a Select based on the tags we found
						var newSelect = createSelect( tagsList );			
						//append it to the body
						document.body.appendChild(newSelect);
						
						//look up the newly appended item
						select = document.getElementById("artist-select");
						//watch for change
						select.onchange = function(){
							if(document.getElementById("songs-div")){
								var songsDiv = document.getElementById("songs-div");
								songsDiv.parentNode.removeChild(songsDiv);
							}
							lookUp('artist','artist.getTopTracks&artist=', select.options[select.selectedIndex].text, 'name', 'url');
							
							//add the artist to favorite artists
							if (storage) {
							  localStorage.artists += ', ' + select.options[select.selectedIndex].text;
							}
							
							
							var waitForLookUp = setTimeout(function(){timerAjax()},1000);
			
							function timerAjax()
							{
								if( isLookUpComplete == true ){
									//
									// LIST - SONGS
									//
									var newList = createList( tagsList );
									document.body.appendChild(newList);
									
									//set up background image
									setBackground(getArtistImage(select.options[select.selectedIndex].text));
									
									//create a list of previously found artists		
									//append it to the body
									document.getElementById("artists-list").innerHTML = "";
									document.getElementById("artists-list").appendChild( createArtistList()) ;
								}
							}
						}
					}
				}
			};
			
		
		}
	}
	
}


//basic GET call
function get( url ){
	complete = false;
	  var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
	complete = true;
	//console.log(xmlHttp.responseText);
    return xmlHttp.responseXML;
	
}

// @@label - String - the textual label for the item
// @@method - String - one of the many methods for the api: http://www.last.fm/api/intro
// @@searchValue - String - band, song, etc. search value
// @@tagName - the XML tag that surrounds the item we'd like to be returned
//
// goes out to Last.fm with a request, then returns an array containing the specified information
function lookUp( label, method, searchValue, tagName, tagName2){
	complete = false;
	var data = null;
	tagsList = (['zero'],['one'],['two']);
	isLookUpComplete = false;
	
	if( searchValue == ''){
		data = get(rootURL +  '?method='+ method + '&api_key=' + api_key);
	}
	else{
		data = get(rootURL +  '?method='+ method + searchValue + '&api_key=' + api_key);
	}
	    
	var waitForAjax = setInterval(function(){timerAjax()},1000);

	function timerAjax()
	{
		if(complete == true){
			//sort through all the tags, grab them by name
			names = data.getElementsByTagName( tagName );
			
			
			//if tag2 exists, time to process it
			//currently used for URLs for each song track
			var names2 = null;
			if(tagName2){
				names2 = data.getElementsByTagName( tagName2 );
			}
			
			var array = new Array();
			//make the label the first item in the array
			//add tags to array
			array.push( label );
			for(var i = 0; i < 15; i++){
				array.push( names[i].textContent );
				if(names2 != null){
					array.push( names2[i].textContent );
				}
				
			}
			
			tagsList = array;
			
			
			isLookUpComplete = true;
			return tagsList;
			
		}
	}
	
}

//add artist to artist-list from local storage
function createArtistList(){
	var newP = document.createElement( 'p' );
	var artists = localStorage.artists;
	newP.innerHTML = artists;
	
	return newP;
}

// @@values - Array - this will be used for each Option
// values[0] - the label
// values[1-i] - the Options
// returns a SELECT element with given values for each Option
function createSelect( values ){
	var newSelect = document.createElement( 'select' );
	//add onChange function
	for(var i = 0; i < values.length; i++){
	var option = document.createElement( 'option' );
 					option.value = values[i];
 					option.text = values[i];
 					newSelect.appendChild( option );
	}
	newSelect.setAttribute('id',  values[0] + "-select" );
 	
	return newSelect;
}

// returns an Unordered List element. Inside are List Items with given values for each.
//@@values - Array where values[0] is the track name and values[1] is the URL
function createList( values ){
	console.log('create list with values:' + values);
    var newList = document.createElement( 'ul' );
    
    
    
    for( var i = 1; i < values.length; i = i + 4 ){
    	//create the list item	
		var newListItem = document.createElement( 'li' );
		
		//create the link to the song
		var newListItemLink = document.createElement( 'a' );
		newListItemLink.setAttribute('href', values[i+1]);
		newListItemLink.setAttribute('target', '_blank');
		newListItemLink.setAttribute('class', 'songItem');
		newListItemLink.innerHTML = values[i];
		
		newListItem.appendChild( newListItemLink );
		newList.appendChild( newListItem );
	}
	
	
    //house the unordered list inside its own div
    var newListDiv = document.createElement( 'div' );
    newListDiv.setAttribute('id', "songs-div" );
    
    //create a nice big label
	var labelH3 = document.createElement( 'h3' );
	labelH3.innerHTML = 'top songs';
	newListDiv.appendChild(labelH3);
	
	
    //add list to div
	newListDiv.appendChild(newList);
    
    return newListDiv;
}

function getArtistImage( artistName ){
	console.log('get artist image called ' + artistName);
	artistImageLoaded = false;
	var response = get(rootURL +  '?method=artist.getinfo&artist=' + artistName + '&api_key=' + api_key);
	var wait = setInterval(function(){waitForAjax()},200);

	function waitForAjax()
	{
		while( artistImageLoaded == false ){
		var artistImages = response.getElementsByTagName( 'image' );
		var urlArray = new Array();
		var containsMega = false;
		
		//get first five images.
		//should result in small, med, large, x-lage, and mega 
		for( var i = 0; i < artistImages.length; i++){
			//console.log( 'image size: ' + artistImages[i].getAttribute("size"));
			if( artistImages[i].getAttribute("size") == "mega"){
				containsMega = true;
			}
			if( artistImages[i].getAttribute("size") == "mega" || artistImages[i].getAttribute("size") == "extralarge"){
				//console.log('added a ' + artistImages[i].getAttribute("size") + ' image.');
				urlArray.push( artistImages[i]);
			}
		}
		console.log('number of artist images: ' + urlArray.length);
		//set background to one of the images
		
		if(containsMega == false){
			setBackground( urlArray[0].textContent );
		}
		else{	
			for( var i = 0; i < urlArray.length; i++){
				if(urlArray[i].getAttribute("size") == "mega"){
					setBackground( urlArray[i].textContent );
					artistImageLoaded = true;
					return urlArray;
					}
				}	
			}	
		
		artistImageLoaded = true;
		return urlArray;
		}
	}
}

function setBackground( url ){
	console.log('background set to ' + url);
	document.body.style.backgroundImage = "url('" + url + "')"; //no-repeat center center fixed";
	document.body.className += 'bgArtistImage';
}
