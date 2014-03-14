function validate( field ){
	for(var i = 0; i < field.length; i++){
		var fieldToCheck = document.forms["comment-form"][field[i]].value;
		if (fieldToCheck == "" || fieldToCheck == null) {
			alert ("Please fill out the " + field[i] + "field.");
			return false;
		}
		else{
			return true;
		}
	}
}