var tagslist;
var artistslist;
var trackslist;
var tracks;
var artists;	

function populate() {
	
	tagslist		= document.music.tags;
	artistslist		= document.music.artists;
	trackslist 		= document.music.tracks;
	
	tags=new Array();
	tags[0]="";
	tags[1]=["Select a city","New York|newyorkvalue", "Los Angeles|losangelesvalue", "Chicago|chicagovalue", "Houston|houstonvalue", "Austin|austinvalue"];
	tags[2]=["Select a city","Vancouver|vancouvervalue", "Tonronto|torontovalue", "Montreal|montrealvalue", "Calgary|calgaryvalue"];
	tags[3]=["Select a city","London|londonvalue", "Glasgow|glasgowsvalue", "Manchester|manchestervalue", "Edinburgh|edinburghvalue", "Birmingham|birminghamvalue"];
	
	artists = new Array();
	artists[1] = ["Select an Activity", "Statue of Liberty|NYAvalue", "Empire State Building|NYBvalue","Wall Street|NYCvalue","Ride the Subway|NYDvalue","Times Square|NYEvalue"];
	artists[2] = ["Select an Activity", "Hollywood Boulevard|LAAvalue", "Staples Center|LABvalue","Walk of Fame|LACvalue","Disney Land|LADvalue","People Watching|LAEvalue"];
	artists[3] = ["Select an Activity", "CHI 1|CHIAvalue", "CHI 2|CHIBvalue","CHI 3|CHICvalue","CHI 4|CHIDvalue","CHI 5|CHIEvalue"];
 	artists[4] =	["Select an Activity", "HOU 1|HOUAvalue", "HOU 2|HOUBvalue","HOU 3|HOUCvalue","HOU 4|HOUDvalue"];
	artists[5] = ["Select an Activity", "AUS 1|AUSAvalue", "AUS 2|AUSBvalue","AUS 3|AUSCvalue","AUS 4|AUSDvalue","AUS 5|AUSEvalue"];
	
	
	}
	
function updateartists(y){
// remove existing tracks select
var myNode1 = document.getElementById("stepThree");
	myNode1.removeChild(myNode1.firstChild);
	artistslist.options.length=0;
	if (y>0)
	{
		for (i=0; i<artists[y].length; i++)
			artistslist.options[artistslist.options.length]=new Option(artists[y][i].split("|")[0], artists[y][i].split("|")[1]);
	}
}
function updatetracks(x){
// a dynamically created select
var mySelect = document.createElement("SELECT");
	mySelect.id = "seltracks";
	mySelect.setAttribute('onChange' ,'alert(this.options[this.options.selectedIndex].text)');
	mySelect.options[0] = new Option('— Select One —');
	for (i=1; i<tracks[x].length; i++)
	{		 
			mySelect.options[mySelect.options.length]= new Option(tracks[x][i].split("|")[0], tracks[x][i].split("|")[1]);
	}	
	var myNode = document.getElementById('stepThree');
	myNode.appendChild(mySelect);
}