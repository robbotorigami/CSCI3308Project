document.getElementById( "tsfall" ).onclick = addTerm;
document.getElementById( "tsspring" ).onclick = addTerm;
document.getElementById( "tssummer" ).onclick = addTerm;
document.getElementById( "tsintermediary" ).onclick = addTerm;

var schedule = document.getElementById( "terms" );
Sortable.create( schedule, {animation:250, draggable:".scheduleterm"} ); // TODO make sure sortable and schedule are ready

function addTerm( id )
{
	var t = document.createElement( "div" );
	t.classList.add( "scheduleterm" );
	t.classList.add( id.target.innerText.toLowerCase() );
	schedule.appendChild( t );
}