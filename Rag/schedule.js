document.getElementById( "tsfall" ).onclick = addTerm;
document.getElementById( "tsspring" ).onclick = addTerm;
document.getElementById( "tssummer" ).onclick = addTerm;
document.getElementById( "tsintermediary" ).onclick = addTerm;
document.getElementById( "capture" ).onclick = photo;

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

function photo()
{
domtoimage.toPng(node)
    .then (function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

}

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

	new Awesomplete( classaddinput, { list: unparsedCourseList, minChars: 1 } );
}

function removeTerm( id )
{
	id.target.parentNode.parentNode.removeChild( id.target.parentNode );
}

// do some course management stuff here while there is no database

var unparsedCourseList = courseAmalgam.split( /(?=^\d{1,4}$)/m );

function addRandomCourse( on )
{
	var cls = document.createElement( "div" );
	cls.classList.add( "course" );
	cls.innerText = unparsedCourseList[ Math.floor( Math.random() * unparsedCourseList.length ) ];
	on.target.parentNode.getElementsByClassName( "classholder" )[0].appendChild( cls );
}

function courseAdder( on )
{

}