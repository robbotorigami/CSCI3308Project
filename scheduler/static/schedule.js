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