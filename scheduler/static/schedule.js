document.getElementById( "tsfall" ).onclick = addTerm;
document.getElementById( "tsspring" ).onclick = addTerm;
document.getElementById( "tssummer" ).onclick = addTerm;
document.getElementById( "tsintermediary" ).onclick = addTerm;

var schedule = document.getElementById( "terms" );
Sortable.create( schedule, {animation:250, draggable:".scheduleterm"} ); // TODO make sure sortable and schedule are ready

document.addEventListener( "awesomplete-selectcomplete", function( selection )
{
	var cls = document.createElement( "div" );
	cls.classList.add( "course" );
	cls.innerText = selection.text.value;
	selection.srcElement.parentNode.parentNode.getElementsByClassName( "classholder" )[0].appendChild( cls );
	selection.srcElement.value = "";
	selection.srcElement.height = 0;
} );

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

	// new Awesomplete( classaddinput, { list: unparsedCourseList, minChars: 1 } );
	var ajax = new XMLHttpRequest();
	ajax.open( "GET", "https://restcountries.eu/rest/v1/lang/fr" );
	ajax.onload = function()
	{
		// var list = JSON.parse( ajax.responseText );
		// var list = ajax.responseText;
		var list = JSON.parse( ajax.responseText ).map( function(i){ return i.name; } );
		new Awesomplete( classaddinput, { list: list } );
		// console.log( "argh" );
		// alert( list );
	};
	// console.log( ajax );
}

function removeTerm( id )
{
	id.target.parentNode.parentNode.removeChild( id.target.parentNode );
}