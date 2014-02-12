console.log("main.js loaded");
var api_key = 'f63ef15c14a30593c4dabb929a422329';
var authURL = 'http://www.last.fm/api/auth/?api_key=';
var rootURL = 'http://ws.audioscrobbler.com/2.0/';
var response = null;
var complete = false;

// create a select element with given values.
// values is an array
function createSelect( values, labelText, method ){
	var select = document.createElement( 'select' );
	
	for( var i = 0; i < values.length; i++ ){
		var option = document.createElement( 'option' );
		option.value = values[i];
		option.text = values[i];
		select.appendChild( option );
	}
	var label = document.createElement('p');
	label.innerHTML = labelText;
	
	//print the value that's been selected
	select.onchange = function(){
	    response = null;
	    var value = select.options[select.selectedIndex].value;
	    console.log(value);
	    ajaxGet(rootURL +  '?method='+ method + '&' + labelText + '=' + value + '&api_key=' + api_key);
	    
		var waitForAjax = setInterval(function(){timerAjax()},1000);

		function timerAjax()
		{
			if(complete == true){
				//sort through all the tags, grab the name
			    names = response.getElementsByTagName('name');
			    var array = new Array();
			    //add tags to array
			    for(var i = 0; i < 10; i++){
			      array.push( names[i].innerHTML + ' - ' +  names[i+1].innerHTML);
			    }
				createSelect( array, 'artist', 'artist.gettoptracks' );
				document.getElementById('main').appendChild(label);
				document.getElementById('main').appendChild(select);
			}
		}
		
	}
	
	
}

function createList(){
    
}

//basic ajax GET call
function ajaxGet( url ){
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