// ran on https://isis-cs.prod.cu.edu/psc/csprod/EMPLOYEE/HRMS/c/SCC_ADMIN_OVRD_STDNT.CLASS_SEARCH.GBL&fedauth

var institution = document.getElementById("CLASS_SRCH_WRK2_INSTITUTION$31$");
institution.options.selectedIndex = 1;
institution.onchange();
checkRate = 15;
subjectCodes = ["ACCT","AIRR","ANTH","APPM","APRD","ARAB","ARCH","AREN","ARSC","ARTF","ARTH","ARTS","ASEN","ASIA","ASTR","ATLS","ATOC","BADM","BAKR","BASE","BCOR","BMEN","BPOL","BSLW","BUSM","CACI","CAMW","CASP","CEES","CESR","CHEM","CHEN","CHIN","CLAS","CMCI","CMDP","COEN","COEN","COML","COMM","COMR","CSCI","CSVC","CVEN","CWCV","DANE","DNCE","EALC","EBIO","ECEN","ECON","EDEN","EDUC","EHON","EMEN","EMUS","ENEN","ENGL","ENST","ENVD","ENVM","ENVS","ESBM","ESLG","ETHN","EVEN","FARR","FILM","FINN","FNCE","FREN","FRSI","FYSM","GEEN","GEOG","GEOL","GREK","GRMN","GRTE","GSAP","GSLL","HEBR","HIND","HIST","HONR","HUEN","HUMN","IAFS","IAWP","INBU","INDO","INFO","INVS","IPHY","ITAL","JOUR","JPNS","JRNL","JWST","KREN","LATN","LAWS","LDSP","LEAD","LGBT","LGTC","LIBB","LIBR","LING","MATH","MBAC","MBAX","MCDB","MCEN","MDRP","MDST","MEMS","MGMT","MILR","MKTG","MSBC","MSBX","MSEN","MSEN","MUEL","MUSC","MUSM","NAVR","NCBE","NCED","NCEN","NCFA","NCGK","NCHS","NCIE","NCMU","NCPS","NCSO","NCSP","NCSS","NCTM","NORW","NRLN","NRSC","OPIM","OPMG","ORMG","PACS","PHIL","PHYS","PMUS","PORT","PRLC","PSCI","PSYC","REAL","RLST","RUSS","SCAN","SEWL","SLHS","SNSK","SOCY","SPAN","SSIR","SUST","SWED","TBTN","TDXD","THTR","TLEN","TMUS","WGST","WMST","WRTG","YIDD"];
subjectCode = subjectCodes.pop();
var outFiles = [];
setTerm();
function setTerm()
{
	if(isLoaderInProcess())
    {
		setTimeout(setTerm, checkRate);
		return;
    }
	var term = document.getElementById("CLASS_SRCH_WRK2_STRM$35$");
	term.options.selectedIndex = 7;
	term.onchange();
	toggleAdvancedSearch();
}
function toggleAdvancedSearch()
{
	if(isLoaderInProcess())
    {
		setTimeout(toggleAdvancedSearch, checkRate);
		return;
    }
	submitAction_win0(document.win0,'DERIVED_CLSRCH_SSR_EXPAND_COLLAPS$149$$1');
	setTwoAndSubmit();
}
function setTwoAndSubmit()
{
	if(isLoaderInProcess())
    {
		setTimeout(setTwoAndSubmit, checkRate);
		return;
    }
	var subject = document.getElementById("SSR_CLSRCH_WRK_SUBJECT$1");
    subject.value = subjectCode;
    subject.onchange();
    var startTime = document.getElementById("SSR_CLSRCH_WRK_MEETING_TIME_START$6");
    startTime.value = "12:01AM";
    startTime.onchange();
    submitAction_win0(document.win0,'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH');
	toggleOpenCourses();
}
function toggleOpenCourses()
{
	if(isLoaderInProcess())
    {
		setTimeout(toggleOpenCourses, checkRate);
		return;
    }

    // debugger;

    if( document.getElementById("DERIVED_CLSMSG_ERROR_TEXT") ) changeSubject();
	submitAction_win0(document.win0,'CU_CLS_RSL_WRK_CU_SSR_EXPAND_ALL');
	grabData();
}
function grabData()
{
	if(isLoaderInProcess())
    {
		setTimeout(grabData, checkRate);
		return;
    }

    // actually grab data here!!

    var output = "";
	
    var courseTitles = document.getElementsByClassName( "SSSGROUPBOXDKBLUENBO" );
    var j = 0;

	for( var i = 0; i < document.getElementsByClassName( "PSGROUPBOX" ).length; i++ )
	{
		if( !courseTitles[j] || !courseTitles[j].parentNode || !courseTitles[j].parentNode.parentNode || !courseTitles[j].parentNode.parentNode.parentNode ) { subjectCodes.push( subjectCode ); break; };
		while( !courseTitles[j].parentNode.parentNode.parentNode.contains( document.getElementById( "MTG_CLASS_NBR$" + i ) ) ) j++;
		var titleLink = courseTitles[j].getElementsByTagName( "div" )[0].getElementsByTagName( "a" )[0];
		output += ( i ) + "\n";
		output += ( titleLink.title.replace( "Collapse section ", "" ) ) + "\n";
		var units = document.getElementById( "CU_CLS_RSL_WRK_CU_SSR_UNITS_RANGE$" + i );
		var restriction = document.getElementById( "CU_CLS_RSL_WRK_CU_SSR_ENRL_RES$" + i );
		var consent = document.getElementById( "CU_CLS_RSL_WRK_CU_SSR_CNSNT_REQ$" + i );
		var seats = document.getElementById( "CU_CLS_RSL_WRK_AVAILABLE_SEATS$" + i );
		var waitList = document.getElementById( "CU_CLS_RSL_WRK_WAIT_TOT$" + i );
		var miscInfo = document.getElementById( "DERIVED_CLSRCH_DESCRLONG$" + i );
		var instructor = document.getElementById( "win0divMTG_INSTR$" + i );
		var room = document.getElementById( "MTG_ROOM$" + i );
		var meetingTime = document.getElementById( "MTG_DAYTIME$" + i );
		var section = document.getElementById( "MTG_CLASSNAME$" + i );
		var classNumber = document.getElementById( "MTG_CLASS_NBR$" + i );
		var meetingDates = document.getElementById( "MTG_TOPIC$" + i );
		var openStatus = document.getElementById( "win0divDERIVED_CLSRCH_SSR_STATUS_LONG$" + i ).getElementsByTagName("div")[0].getElementsByTagName("img")[0].alt;
		output += ( "Units " + ( units ? units.textContent : "nil" ) ) + "\n";
		output += ( "Restriction " + ( restriction ? restriction.textContent : "nil" ) ) + "\n";
		output += ( "Consent Required " + ( consent ? consent.textContent : "nil" ) ) + "\n";
		output += ( "Seats Remaining " + ( seats ? seats.textContent : "nil" ) ) + "\n";
		output += ( "Waitlist Total " + ( waitList ? waitList.textContent : "nil" ) ) + "\n";
		output += ( "MiscInfo " + ( miscInfo ? miscInfo.textContent : "nil" ) ) + "\n";
		output += ( "Instructor " + ( instructor ? instructor.textContent : "nil" ) ) + "\n";
		output += ( "Room " + ( room ? room.textContent : "nil" ) ) + "\n";
		output += ( "Meeting Time " + ( meetingTime ? meetingTime.textContent : "nil" ) ) + "\n";
		output += ( "Section " + ( section ? section.textContent : "nil" ) ) + "\n";
		output += ( "Class Code " + ( classNumber ? classNumber.textContent : "nil" ) ) + "\n";
		output += ( "Meeting Dates " + ( meetingDates ? meetingDates.textContent : "nil" ) ) + "\n";
		output += ( "Open Status " + ( openStatus ? openStatus : "nil" ) ) + "\n";
	}

	outFiles.push( subjectCode + ".txt" );
	outFiles.push( output );
	// download( subjectCode + ".txt", output );

	submitAction_win0(document.win0,'CLASS_SRCH_WRK2_SSR_PB_MODIFY');
	changeSubject();
}
function changeSubject()
{
	if(isLoaderInProcess())
    {
		setTimeout(changeSubject, checkRate);
		return;
    }
    subjectCode = subjectCodes.pop();
	var subject = document.getElementById("SSR_CLSRCH_WRK_SUBJECT$1");
    if( !subject ) { subjectCodes.push( subjectCode ); changeSubject(); return; } // if something went wrong do the natural thing and overflow the stack intentionally. TODO: fix.
    subject.value = subjectCode;
    subject.onchange();
    submitAction_win0(document.win0,'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH');
	toggleOpenCourses();
}



function download( filename, text )
{
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}