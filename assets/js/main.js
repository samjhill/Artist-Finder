console.log("main.js loaded");
var response = null;

// create a select element with given values.
// values is an array
function createSelect( values ){
	var select = document.createElement( 'select' );
	
	for( var i = 0; i < values.length; i++ ){
		var option = document.createElement( 'option' );
		option.value = values[i];
		option.text = values[i];
		select.appendChild( option );
	}
	document.getElementById('body').appendChild(select);
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
		    return response;
		  }
		else{ return 'failed'; }
	    }
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	
}

//basic ajax POST call
function ajaxPost( url, data ){
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send( data );
	var response = xmlhttp.responseText;
	console.log( response );
	return response;
}