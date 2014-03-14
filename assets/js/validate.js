function validate( field ){
	for(var i = 0; i < field.length; i++){
		var fieldToCheck = document.forms["comment-form"][field[i]].value;
		if (fieldToCheck == "" || fieldToCheck == null) {
			alert ("Please fill out " + field[i] + ".");
			return false;
		}
		else{
			return true;
		}
	}
}