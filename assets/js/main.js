console.log("main.js loaded");
 var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	
	
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
	return select;
}

//basic ajax GET call
function ajaxGet( url ){
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	var response = xmlhttp.responseText;
	console.log( response );
	return response;
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