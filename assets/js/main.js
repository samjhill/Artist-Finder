// @@Author Sam Hill
// @@website http://www.samjhill.com


console.log("main.js loaded");
var api_key = 'f63ef15c14a30593c4dabb929a422329';
var authURL = 'http://www.last.fm/api/auth/?api_key=';
var rootURL = 'http://ws.audioscrobbler.com/2.0/';
var response = null;
var complete = false;


// @@values - Array - this will be used for each Option
// @@labelText - String - label for the item
// returns a DIV element. Inside is a select, with given values for each Option
function createSelect( values, labelText ){
	var newSelect = document.createElement( 'select' );
	
	for( var i = 0; i < values.length; i++ ){
		var option = document.createElement( 'option' );
		option.value = values[i];
		option.text = values[i];
		newSelect.appendChild( option );
	}
	var label = document.createElement('p');
	label.innerHTML = labelText;
	
	
	newSelect.onchange = function(){
		//print the value that's been selected
	    var value = newSelect.options[newSelect.selectedIndex].value;
	    console.log(value);
	    
		
	}
	var newDiv = document.createElement( 'div' );
	
	myDiv.appendChild(label);
	myDiv.appendChild(newSelect);
	return newDiv;
	
	
}

function createList(){
    
}

//basic ajax GET call
function ajaxGet( url ){
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
		    console.log( 'response inside ajaxGet: ' + response.children );
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
// goes out to Last.fm with a request, then returns an array of items to spec
function ajaxParse( label, method, searchValue, tagName){
	if( searchValue == ''){
		ajaxGet(rootURL +  '?method='+ method + '&api_key=' + api_key);
	}
	else{
		ajaxGet(rootURL +  '?method='+ method + searchValue + '&api_key=' + api_key);
	}
	    
	var waitForAjax = setInterval(function(){timerAjax()},1000);

	function timerAjax()
	{
		if(complete == true){
			//sort through all the tags, grab the name
			names = response.getElementsByTagName( tagName);
			var array = new Array();
			//add tags to array
			for(var i = 0; i < 10; i++){
			  array.push( names[i].innerHTML );
			}
			return array;
		}
	}
}