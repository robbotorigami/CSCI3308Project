/**
@alias addTermCallbacks
@description Specifies the callback for clicking an add term button.
*/
document.getElementById( "tsfall" ).onclick = addTerm;
document.getElementById( "tsspring" ).onclick = addTerm;
document.getElementById( "tssummer" ).onclick = addTerm;
document.getElementById( "tsintermediary" ).onclick = addTerm;

// This should be migrated into a database query eventually.
/**
This list is a hard copy from a guest search scrape.<br />
This is an array of strings that have the exact data that the scrape yielded.
*/
var unparsedCourseList = courseAmalgam.split( /(?=^\d{1,4}$)/m );
unparsedCourseList = unparsedCourseList.filter(function(item, pos) { // http://stackoverflow.com/a/9229821
    return unparsedCourseList.indexOf(item) == pos;
})

/**
Variable that directly holds the terms div.<br /><br />
Serves as link for Sortable.js to make terms rearrangable,<br />
as reference to directly add terms upon clicking the respective term adding callback,<br />
and as a link to export to png.
*/
var schedule = document.getElementById( "terms" );
Sortable.create( schedule, {animation:250, draggable:".scheduleterm"} ); // TODO make sure sortable and schedule are ready

Sortable.create( document.getElementById( "viewCustomizer" ), {animation:250, draggable:".customViewElement", onEnd:rearrange} );

/**
@name confirmClassAdd
@description Callback for Awesomplete's selection complete function<br />
Parses guest search scrape (unparsedCourseList) and inserts a course div into the specified term.
*/
document.addEventListener( "awesomplete-selectcomplete", function( selection )
{
	var cls = document.createElement( "div" );
	cls.classList.add( "course" );
																			cls.value = selection.text.value;
	// cls.innerText = selection.text.value;
	// console.log( selection.text.value.split( "\n" ) );
	var data = selection.text.value.split( "\n" );
	cls.innerHTML += "<div class='courserender courseid'>" + data[0] + "</div>";
	cls.innerHTML += "<div class='courserender coursesubject'>" + data[1].split( " - " )[0].split( " " )[0] + "</div>";
	cls.innerHTML += "<div class='courserender coursenumber'>" + data[1].split( " - " )[0].split( " " )[1] + "</div>";
	cls.innerHTML += "<div class='courserender coursename'>" + data[1].split( " - " )[1] + "</div>";
	cls.innerHTML += "<div class='courserender courseunits'>" + data[2] + "</div>";
	// we currently don't deal with course restriction status even though we scrape it
	cls.innerHTML += "<div class='courserender courseconsentrequired'>" + data[4] + "</div>";
	cls.innerHTML += "<div class='courserender courseseatsremaining'>" + data[5] + "</div>";
	cls.innerHTML += "<div class='courserender coursewaitlisttotal'>" + data[6] + "</div>";
	cls.innerHTML += "<div class='courserender coursemiscinfo'>" + data[7] + "</div>";
	cls.innerHTML += "<div class='courserender courseinstructor'>" + data[8] + "</div>";
	// there is a blank line in the current scrape that should be removed earlier than this stage
	cls.innerHTML += "<div class='courserender courseroom'>" + data[10] + "</div>";
	cls.innerHTML += "<div class='courserender coursemeetingtime'>" + data[11] + "</div>";
	cls.innerHTML += "<div class='courserender coursesection'>" + data[12] + "</div>";
	cls.innerHTML += "<div class='courserender coursecode'>" + data[13] + "</div>";
	cls.innerHTML += "<div class='courserender coursemeetingdates'>" + data[14] + "</div>";
	cls.innerHTML += "<div class='courserender courseopenstatus'>" + data[15] + "</div>";
	// there is a blank line at the end of the current scrape that should be removed earlier than this stage

	cls.innerHTML += "<div class='officialMapSearch'><a class='link' href='http://www.colorado.edu/campusmap/map.html?bldg=" + data[10].split( " " )[1] + "' target='_blank'>Official Map Search</a></div>"
	cls.innerHTML += "<div class='courseCatalogSearch'><a class='link' href='http://www.colorado.edu/catalog/2016-17/courses?subject=" + data[1].split( " - " )[0].split( " " )[0] + "&number=" + data[1].split( " - " )[0].split( " " )[1] + "' target='_blank'>View in Catalog</a></div>"
	cls.innerHTML += "<div class='ratemyprofessorsSearch'><a class='link' href='http://www.ratemyprofessors.com/search.jsp?query=" + data[8].substring( 11 ) + "' target='_blank'>Search RateMyProfessors</a></div>"

	selection.srcElement.parentNode.parentNode.getElementsByClassName( "classholder" )[0].appendChild( cls );
	selection.srcElement.value = "";
	selection.srcElement.height = 0;
} );

/**
All courses are updated to cull view components as specified by the custom view.<br />
This is a callback on the custom view components' onclick.
*/
function toggleCustomViewDisabled( id )
{
	id.classList.toggle( "viewDisabled" );
	Array.prototype.forEach.call( document.getElementsByClassName( "course" ), function( el )
	{
		var toAffect = el.getElementsByClassName( id.id )[0];
		if( id.classList.contains( "viewDisabled" ) )
			toAffect.classList.add( "cull" );
		else
			toAffect.classList.remove( "cull" );
	});
}

/**
All courses are updated with the order of view components as specified by the custom view.<br />
This is a callback on the custom view components' being rearranged by Sortable.js. 
*/
function rearrange( evt )
{
	if( evt.oldIndex == evt.newIndex ) return;
	Array.prototype.forEach.call( document.getElementsByClassName( "course" ), function( el )
	{
		var toMove = el.getElementsByClassName( evt.item.id )[0];
		toMove.parentNode.insertBefore( toMove, el.getElementsByClassName( "courserender" )[evt.newIndex + (evt.newIndex > evt.oldIndex ? 1 : 0)] );
	});
}

// well... turns out html has quite a lot of transparency going on... which makes sense
// because I use transparent colours a lot... so this is a jpg. that's ok.
// I'm sure if I just save it as a png no one will notice...
// TODO: render all data about classes instead of restricting height of course cards
//       additionally, don't render screwed up page heights (due to awesomplete)
/**
Exports the schedule to a png.<br />
Scales the current view of the schedule up and renders with domtoimage.<br />
Prompts user to download 'schedule.png' directly. 
*/
function pngExport()
{
	var props = {
		width: schedule.clientWidth*3,
		height: schedule.clientHeight*3,
		style: {
		'transform': 'scale('+3+')',
		'transform-origin': 'top left'
		},
		bgcolor: "rgb(225, 225, 225)"
	}
	domtoimage.toJpeg( schedule, props )
    .then (function (/*blob*/dataUrl) {
        // window.saveAs( blob, "schedule.png" );
        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild( img );
        var link = document.createElement( 'a' );
        link.download = "schedule.png";
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('Failed to export to png.', error);
        alert( "Failed to export to png." );
    });
}

/**
Adds a term to the schedule plan.<br />
Constructs the html and directly appends it to the document.<br />
Creates a Sortable.js instance to rearrange classes within the term.<br />
Creates a Awesomplete instance to search for classes to later add to the term.
*/
function addTerm( id )
{
	var t = document.createElement( "div" );
	t.classList.add( "scheduleterm" );
	t.classList.add( id.target.innerText.toLowerCase() );

	// var classaddbutton = document.createElement( "div" );
	// classaddbutton.classList.add( "classaddbutton" );
	// classaddbutton.innerHTML = "+";
	// classaddbutton.onclick = addRandomCourse;
	var classaddinput = document.createElement( "input" );
	classaddinput.placeholder = "Add Course";
	t.appendChild( classaddinput );

	var classholder = document.createElement( "div" );
	classholder.classList.add( "classholder" );
	classholder.classList.add( "rowcontainer" );

	Sortable.create( classholder, {animation:250, draggable:".course", group:"courses"} );

	var del = document.createElement( "div" );
	del.classList.add( "delterm" );
	del.innerText = "x";
	del.onclick = removeTerm;

	// t.appendChild( classaddbutton );
	t.appendChild( classholder );
	t.appendChild( del );

	schedule.appendChild( t );

	new Awesomplete( classaddinput, { list: unparsedCourseList, minChars: 1, maxItems: 300, autoFirst: true } );
//	var ajax = new XMLHttpRequest();
//	ajax.open( "GET", "https://restcountries.eu/rest/v1/lang/fr" );
//	ajax.onload = function()
//	{
//		// var list = JSON.parse( ajax.responseText );
//		// var list = ajax.responseText;
//		var list = JSON.parse( ajax.responseText ).map( function(i){ return i.name; } );
//		new Awesomplete( classaddinput, { list: list } );
//		console.log( "argh" );
//		alert( list );
//	};
//	// console.log( ajax );
}

/**
Callback for removal of a term.<br />
Invoked upon onclick of the removal button.
*/
function removeTerm( id )
{
	id.target.parentNode.parentNode.removeChild( id.target.parentNode );
}

/**
Imports a schdule export.<br />
Invoked upon onclick of the import button.
*/
function insert()
{
	var imp = prompt( "Paste the content of an export.", "" );
	var trm = imp.replace( /```/g, "\n" ).split( /^- - -$/m );
	// console.log( trm );
	for( var i = 0; i < trm.length - 1; i++ )
	{
		var tsp = trm[i].split( "\n" );
		var t = addTermManually( tsp[0] == "" ? tsp[1] : tsp[0] );
		// var st = "";
		// for( var i = tsp[0] == "" ? 2 : 1; i < tsp. )
		while( trm[i].indexOf( "\n" ) == 0 || trm[i].indexOf( "spring" ) == 0 || trm[i].indexOf( "fall" ) == 0 || trm[i].indexOf( "summer" ) == 0 || trm[i].indexOf( "intermediary" ) == 0 )
			trm[i] = trm[i].substring( trm[i].indexOf( "\n" ) + 1 );
		var crs = trm[i].split( /^ -$/m );
		for( var j = 0; j < crs.length - 1; j++ )
		{
			while( crs[j].indexOf( "\n" ) == 0 || crs[j].indexOf( "spring" ) == 0 || crs[j].indexOf( "fall" ) == 0 || crs[j].indexOf( "summer" ) == 0 || crs[j].indexOf( "intermediary" ) == 0 )
			crs[j] = crs[j].substring( crs[j].indexOf( "\n" ) + 1 );
			addCourseManually( crs[j], t );
		}

	}
}

/**
Exports a schdule.<br />
Invoked upon onclick of the export button.<br />
Directly saves the export to the clipboard.<br />
*/
function exportSchedule()
{
	var out = "";
	Array.prototype.forEach.call( document.getElementsByClassName( "scheduleterm" ), function( el )
	{
		if( el.classList.contains( "fall" ) ) out += ( "fall```" );
		if( el.classList.contains( "spring" ) ) out += ( "spring```" );
		if( el.classList.contains( "summer" ) ) out += ( "summer```" );
		if( el.classList.contains( "intermediary" ) ) out += ( "intermediary```" );
		Array.prototype.forEach.call( el.getElementsByClassName( "course" ), function( el )
		{
			out += ( el.value + "```" );
			out += ( " -```" );
		});
		out += ( "- - -```" );
	});
	// prompt( "Copy to later paste to import.", out.replace( /\n/g, "```" ) );
	var textArea = document.createElement( "textarea" );
	textArea.value = out.replace( /\n/g, "```" );
	document.body.appendChild( textArea );
	textArea.select();
	try
	{
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		alert("Schedule has been copied to clipboard.");
	}
	catch( err ) { console.log("Failed to export schedule."); }
	document.body.removeChild( textArea );
}

function addTermManually( termType )
{
	var t = document.createElement( "div" );
	t.classList.add( "scheduleterm" );
	t.classList.add( termType );

	// var classaddbutton = document.createElement( "div" );
	// classaddbutton.classList.add( "classaddbutton" );
	// classaddbutton.innerHTML = "+";
	// classaddbutton.onclick = addRandomCourse;
	var classaddinput = document.createElement( "input" );
	classaddinput.placeholder = "Add Course";
	t.appendChild( classaddinput );

	var classholder = document.createElement( "div" );
	classholder.classList.add( "classholder" );
	classholder.classList.add( "rowcontainer" );

	Sortable.create( classholder, {animation:250, draggable:".course", group:"courses"} );

	var del = document.createElement( "div" );
	del.classList.add( "delterm" );
	del.innerText = "x";
	del.onclick = removeTerm;

	// t.appendChild( classaddbutton );
	t.appendChild( classholder );
	t.appendChild( del );

	schedule.appendChild( t );

	new Awesomplete( classaddinput, { list: unparsedCourseList, minChars: 1, maxItems: 300, autoFirst: true } );
//	var ajax = new XMLHttpRequest();
//	ajax.open( "GET", "https://restcountries.eu/rest/v1/lang/fr" );
//	ajax.onload = function()
//	{
//		// var list = JSON.parse( ajax.responseText );
//		// var list = ajax.responseText;
//		var list = JSON.parse( ajax.responseText ).map( function(i){ return i.name; } );
//		new Awesomplete( classaddinput, { list: list } );
//		console.log( "argh" );
//		alert( list );
//	};
//	// console.log( ajax );
	return t;
}

function addCourseManually( selectionText, toTerm )
{
	var cls = document.createElement( "div" );
	cls.classList.add( "course" );
																			cls.value = selectionText;
	// cls.innerText = selection.text.value;
	// console.log( selection.text.value.split( "\n" ) );
	var data = selectionText.split( "\n" );
	cls.innerHTML += "<div class='courserender courseid'>" + data[0] + "</div>";
	cls.innerHTML += "<div class='courserender coursesubject'>" + data[1].split( " - " )[0].split( " " )[0] + "</div>";
	cls.innerHTML += "<div class='courserender coursenumber'>" + data[1].split( " - " )[0].split( " " )[1] + "</div>";
	cls.innerHTML += "<div class='courserender coursename'>" + data[1].split( " - " )[1] + "</div>";
	cls.innerHTML += "<div class='courserender courseunits'>" + data[2] + "</div>";
	// we currently don't deal with course restriction status even though we scrape it
	cls.innerHTML += "<div class='courserender courseconsentrequired'>" + data[4] + "</div>";
	cls.innerHTML += "<div class='courserender courseseatsremaining'>" + data[5] + "</div>";
	cls.innerHTML += "<div class='courserender coursewaitlisttotal'>" + data[6] + "</div>";
	cls.innerHTML += "<div class='courserender coursemiscinfo'>" + data[7] + "</div>";
	cls.innerHTML += "<div class='courserender courseinstructor'>" + data[8] + "</div>";
	// there is a blank line in the current scrape that should be removed earlier than this stage
	cls.innerHTML += "<div class='courserender courseroom'>" + data[10] + "</div>";
	cls.innerHTML += "<div class='courserender coursemeetingtime'>" + data[11] + "</div>";
	cls.innerHTML += "<div class='courserender coursesection'>" + data[12] + "</div>";
	cls.innerHTML += "<div class='courserender coursecode'>" + data[13] + "</div>";
	cls.innerHTML += "<div class='courserender coursemeetingdates'>" + data[14] + "</div>";
	cls.innerHTML += "<div class='courserender courseopenstatus'>" + data[15] + "</div>";
	// there is a blank line at the end of the current scrape that should be removed earlier than this stage

	cls.innerHTML += "<div class='officialMapSearch'><a class='link' href='http://www.colorado.edu/campusmap/map.html?bldg=" + data[10].split( " " )[1] + "' target='_blank'>Official Map Search</a></div>"
	cls.innerHTML += "<div class='courseCatalogSearch'><a class='link' href='http://www.colorado.edu/catalog/2016-17/courses?subject=" + data[1].split( " - " )[0].split( " " )[0] + "&number=" + data[1].split( " - " )[0].split( " " )[1] + "' target='_blank'>View in Catalog</a></div>"
	cls.innerHTML += "<div class='ratemyprofessorsSearch'><a class='link' href='http://www.ratemyprofessors.com/search.jsp?query=" + data[8].substring( 11 ) + "' target='_blank'>Search RateMyProfessors</a></div>"

	// selection.srcElement.parentNode.parentNode.getElementsByClassName( "classholder" )[0].appendChild( cls );
	// selection.srcElement.value = "";
	// selection.srcElement.height = 0;
	toTerm.getElementsByClassName( "classholder" )[0].appendChild( cls );
};

var reqs = [[1, "HUEN1010", "HUEN3100", "PHYS3050", "WRTG3030", "WRTG3035"],
			// [2, "CLAS4120", "HUEN3350"],
			[4, "ECON2010", "ECON2020", "LATN1024", "LATN2114"],
			[1, "CSCI1000"],
			[1, "CSCI1300"],
			[1, "CSCI2270"],
			[1, "CSCI2400"],
			[1, "CSCI3104"],
			[1, "CSCI3155"],
			[1, "CSCI3308"],
			[4, "CSCI3002", "CSCI3202", "CSCI3287", "CSCI3302", "CSCI3434", "CSCI3702", "CSCI3832", "CSCI4229", "CSCI4239", "CSCI4253", "CSCI4273", "CSCI4302", "CSCI4314", "CSCI4413", "CSCI4446", "CSCI4448", "CSCI4502", "CSCI4555", "CSCI4576", "CSCI4586", "CSCI4593", "CSCI4753", "CSCI4809"],
			[2, "CSCI4308", "CSCI4318"],
			[1, "MATH1300"],
			[1, "MATH2300"],
			[1, "CSCI2824"],
			[1, "MATH3130"],
			[1, "APPM3570"],
			[1, "PHYS1110"],
			[1, "PHYS1120"],
			[1, "PHYS1140"]];

// 58 total csci hours
//128 total hours

prereqs =
{
	"APPM3570": [ ["APPM2350", "MATH2400"] ],
	"APPM2350": [ ["APPM1360", "MATH2300"] ],
	"MATH2001": [ ["MATH1300", "MATH1310", "APPM1345", "APPM1350"] ],
	"CSCI2270": [ ["CSCI1300", "CSCI1310", "CSCI1320", "ECEN1030", "ECEN1310"], ["APPM1345", "APPM1350", "MATH1300", "MATH1310"] ],
	"CSCI2824": [ ["CSCI2270"], ["MATH1300", "MATH1310", "APPM1345", "APPM1350"] ],
	"CSCI3104": [ ["CSCI2270"], ["APPM1360", "MATH2300"], ["CSCI2824", "ECEN2703", "APPM3170", "MATH2001"] ],
	"CSCI2400": [ ["CSCI2270"], ["CSCI2824", "MATH2001", "ECEN2703", "APPM3170"] ],
	"CSCI3308": [ ["CSCI2270"] ],
	"PHYS2130": [ ["PHYS1120"], ["MATH2400", "APPM2350"] ],
	"PHYS1140": [ ["PHYS1120"] ]
};

// doesn't deal with coreqs at all
/**
Runs a mock audit given reqs and prereqs.<br />
reqs is the list of courses which must be taken to satisfy the degree audit.<br />
prereqs is the list of prerequisites for each class that has them.<br />
Outputs which courses must be added to the schedule to satisfy the audit.<br />
Outputs which courses do not have their prerequisites satisfied.
*/
function checkReqs()
{
	console.log( "---" );
	var ret = true;
	var schdg = [];
	Array.prototype.forEach.call( schedule.getElementsByClassName( "scheduleterm" ), function( term )
	{
		schdg.push( [] );
		Array.prototype.forEach.call( term.getElementsByClassName( "course" ), function( course )
		{
			schdg[ schdg.length - 1 ].push( course.getElementsByClassName( "coursesubject" )[0].innerText + course.getElementsByClassName( "coursenumber" )[0].innerText );
		});
	});
	Array.prototype.forEach.call( reqs, function( req )
	{
		for( var i = 1, c = 0; i < req.length; i++ )
			Array.prototype.forEach.call( schdg, function( term )
				{
					if( term.indexOf( req[i] ) != -1 )
						c++;
				} )
		if( c < req[0] )
		{
			console.log( "Schedule missing: " + req );
			ret = false;
		}
	});
	for( var i = 0; i < schdg.length; i++ )
		courseLoop: for( var j = 0; j < schdg[i].length; j++ )
			for( var k = 0; prereqs[ schdg[i][j] ] && k < prereqs[ schdg[i][j] ].length; k++ ) // and prereq
			{
				var success = false;
				orReqLoop: for( var l = 0; l < prereqs[ schdg[i][j] ][k].length; l++ ) // or prereq
				{
					//if one of these is found in previous terms, continue andPrereq loop
					for( var m = 0; m < i; m++ )
						if( schdg[m].indexOf( prereqs[ schdg[i][j] ][k][l] ) > -1 )
						{
							success = true;
							break orReqLoop;
						}
				}
				if( !success )
				{
					console.log( schdg[i][j] + " (term " + (i+1) + ") missing prerequisite: " + JSON.stringify( prereqs[ schdg[i][j] ] ) );
					continue courseLoop;
				}
			}
	console.log( "---" );
	return ret;
}


// my fall and spring
//fall```132```APPM 3570 - Applied Probability```Units 3```Restriction Y```Consent Required N```Seats Remaining 4```Waitlist Total 0```MiscInfo nil```Instructor Manuel Lladser``````Room ECCR 150```Meeting Time MoWeFr 2:00PM - 2:50PM```Section 002-LECBoulder 16-Wk Session/Full Sem```Class Code 21692```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```67```APPM 2350 - Calculus 3 for Engineers```Units 4```Restriction Y```Consent Required N```Seats Remaining 4```Waitlist Total 0```MiscInfo nil```Instructor Justin Cole``````Room ECCR 200```Meeting Time MoWeFr 1:00PM - 1:50PM```Section 160-LECBoulder 16-Wk Session/Full Sem```Class Code 15598```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```99```MATH 2001 - Introduction to Discrete Mathematics```Units 3```Restriction N```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor Faan Liu``````Room ECCR 131```Meeting Time MoWeFr 10:00AM - 10:50AM```Section 002-LECBoulder 16-Wk Session/Full Sem```Class Code 21917```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed`````` -```30```CSCI 2270 - Computer Science 2: Data Structures```Units 4```Restriction Y```Consent Required N```Seats Remaining 16```Waitlist Total 0```MiscInfo nil```Instructor Rhonda Hoenigman``````Room MATH 100```Meeting Time MoWeFr 3:00PM - 3:50PM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 26334```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```65```CSCI 2824 - Discrete Structures```Units 3```Restriction Y```Consent Required N```Seats Remaining 3```Waitlist Total 0```MiscInfo nil```Instructor Christian Ketelsen``````Room FLMG 155```Meeting Time MoWeFr 9:00AM - 9:50AM```Section 001-LECBoulder 16-Wk Session/Full Sem```Class Code 28545```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```- - -```spring```67```CSCI 3104 - Algorithms```Units 4```Restriction Y```Consent Required N```Seats Remaining 1```Waitlist Total 0```MiscInfo nil```Instructor Aaron Clauset``````Room CHEM 140```Meeting Time TuTh 12:30PM - 1:45PM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 27713```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```54```CSCI 2400 - Computer Systems```Units 4```Restriction Y```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor Richard Han``````Room GOLD A2B70```Meeting Time TuTh 9:30AM - 10:45AM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 28021```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed`````` -```82```CSCI 3308 - SoftwareDevelopment Methods and Tools```Units 3```Restriction Y```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor David Graham``````Room DUAN G1B20```Meeting Time MoFr 11:00AM - 11:50AM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 28192```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed`````` -```147```PHYS 2130 - General Physics 3```Units 3```Restriction Y```Consent Required N```Seats Remaining 11```Waitlist Total 0```MiscInfo nil```Instructor Minhyea Lee``````Room DUAN G130```Meeting Time MoWeFr 12:00PM - 12:50PM```Section 001-LECBoulder 16-Wk Session/Full Sem```Class Code 17649```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```100```PHYS 1140 - Experimental Physics 1```Units 1```Restriction N```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor Chen Tang``````Room DUAN G2B75```Meeting Time Th 8:00AM - 9:50AM```Section 321-LABBoulder 16-Wk Session/Full Sem```Class Code 22471```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed`````` -```42```CLAS 4120 - Greek and Roman Tragedy```Units 3```Restriction N```Consent Required N```Seats Remaining 1```Waitlist Total 0```MiscInfo Notes: This is a combined section class```Instructor Jacqueline Elliott``````Room HLMS 201```Meeting Time TuTh 2:00PM - 3:15PM```Section 001-LECBoulder 16-Wk Session/Full Sem```Class Code 29304```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```- - -```

// my fall and spring with some prerequisites filled out
//intermediary```91```MATH 1300 - Calculus 1```Units 5```Restriction Y```Consent Required N```Seats Remaining 1```Waitlist Total 0```MiscInfo nil```Instructor Ira Becker, ```Keli Parker``````Room ECCR 131```Meeting Time MoTuWeThFr 3:00PM - 3:50PM```Section 016-LECBoulder 16-Wk Session/Full Sem```Class Code 24266```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```121```MATH 2300 - Calculus 2```Units 5```Restriction N```Consent Required N```Seats Remaining 3```Waitlist Total 0```MiscInfo nil```Instructor Trubee Davison``````Room HUMN 1B70```Meeting Time MoTuWeThFr 9:00AM - 9:50AM```Section 800-LECBoulder 16-Wk Session/Full Sem```Class Code 34958```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```1```CSCI 1300 - Computer Science 1: Starting Computing```Units 4```Restriction Y```Consent Required N```Seats Remaining 1```Waitlist Total 0```MiscInfo nil```Instructor David Knox``````Room MATH 100```Meeting Time MoWeFr 1:00PM - 1:50PM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 28268```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```40```PHYS 1120 - General Physics 2```Units 4```Restriction Y```Consent Required N```Seats Remaining 27```Waitlist Total 0```MiscInfo nil```Instructor Michael Dubson``````Room DUAN G1B30```Meeting Time MoWeFr 8:00AM - 8:50AM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 17263```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open`````` -```- - -```fall```132```APPM 3570 - Applied Probability```Units 3```Restriction Y```Consent Required N```Seats Remaining 4```Waitlist Total 0```MiscInfo nil```Instructor Manuel Lladser``````Room ECCR 150```Meeting Time MoWeFr 2:00PM - 2:50PM```Section 002-LECBoulder 16-Wk Session/Full Sem```Class Code 21692```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```67```APPM 2350 - Calculus 3 for Engineers```Units 4```Restriction Y```Consent Required N```Seats Remaining 4```Waitlist Total 0```MiscInfo nil```Instructor Justin Cole``````Room ECCR 200```Meeting Time MoWeFr 1:00PM - 1:50PM```Section 160-LECBoulder 16-Wk Session/Full Sem```Class Code 15598```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```99```MATH 2001 - Introduction to Discrete Mathematics```Units 3```Restriction N```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor Faan Liu``````Room ECCR 131```Meeting Time MoWeFr 10:00AM - 10:50AM```Section 002-LECBoulder 16-Wk Session/Full Sem```Class Code 21917```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed````````` -```30```CSCI 2270 - Computer Science 2: Data Structures```Units 4```Restriction Y```Consent Required N```Seats Remaining 16```Waitlist Total 0```MiscInfo nil```Instructor Rhonda Hoenigman``````Room MATH 100```Meeting Time MoWeFr 3:00PM - 3:50PM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 26334```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```65```CSCI 2824 - Discrete Structures```Units 3```Restriction Y```Consent Required N```Seats Remaining 3```Waitlist Total 0```MiscInfo nil```Instructor Christian Ketelsen``````Room FLMG 155```Meeting Time MoWeFr 9:00AM - 9:50AM```Section 001-LECBoulder 16-Wk Session/Full Sem```Class Code 28545```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```- - -```spring```67```CSCI 3104 - Algorithms```Units 4```Restriction Y```Consent Required N```Seats Remaining 1```Waitlist Total 0```MiscInfo nil```Instructor Aaron Clauset``````Room CHEM 140```Meeting Time TuTh 12:30PM - 1:45PM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 27713```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```54```CSCI 2400 - Computer Systems```Units 4```Restriction Y```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor Richard Han``````Room GOLD A2B70```Meeting Time TuTh 9:30AM - 10:45AM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 28021```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed````````` -```82```CSCI 3308 - SoftwareDevelopment Methods and Tools```Units 3```Restriction Y```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor David Graham``````Room DUAN G1B20```Meeting Time MoFr 11:00AM - 11:50AM```Section 100-LECBoulder 16-Wk Session/Full Sem```Class Code 28192```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed````````` -```147```PHYS 2130 - General Physics 3```Units 3```Restriction Y```Consent Required N```Seats Remaining 11```Waitlist Total 0```MiscInfo nil```Instructor Minhyea Lee``````Room DUAN G130```Meeting Time MoWeFr 12:00PM - 12:50PM```Section 001-LECBoulder 16-Wk Session/Full Sem```Class Code 17649```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```100```PHYS 1140 - Experimental Physics 1```Units 1```Restriction N```Consent Required N```Seats Remaining 0```Waitlist Total 0```MiscInfo nil```Instructor Chen Tang``````Room DUAN G2B75```Meeting Time Th 8:00AM - 9:50AM```Section 321-LABBoulder 16-Wk Session/Full Sem```Class Code 22471```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Closed````````` -```42```CLAS 4120 - Greek and Roman Tragedy```Units 3```Restriction N```Consent Required N```Seats Remaining 1```Waitlist Total 0```MiscInfo Notes: This is a combined section class```Instructor Jacqueline Elliott``````Room HLMS 201```Meeting Time TuTh 2:00PM - 3:15PM```Section 001-LECBoulder 16-Wk Session/Full Sem```Class Code 29304```Meeting Dates 01/17/2017 - 05/05/2017```Open Status Open````````` -```- - -```