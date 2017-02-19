var institution = document.getElementById("CLASS_SRCH_WRK2_INSTITUTION$31$");
institution.options.selectedIndex = 1;
institution.onchange();
checkRate = 10;
subjectCodes = ["ACCT","AIRR","ANTH","APPM","APRD","ARAB","ARCH","AREN","ARSC","ARTF","ARTH","ARTS","ASEN","ASIA","ASTR","ATLS","ATOC","BADM","BAKR","BASE","BCOR","BMEN","BPOL","BSLW","BUSM","CACI","CAMW","CASP","CEES","CESR","CHEM","CHEN","CHIN","CLAS","CMCI","CMDP","COEN","COEN","COML","COMM","COMR","CSCI","CSVC","CVEN","CWCV","DANE","DNCE","EALC","EBIO","ECEN","ECON","EDEN","EDUC","EHON","EMEN","EMUS","ENEN","ENGL","ENST","ENVD","ENVM","ENVS","ESBM","ESLG","ETHN","EVEN","FARR","FILM","FINN","FNCE","FREN","FRSI","FYSM","GEEN","GEOG","GEOL","GREK","GRMN","GRTE","GSAP","GSLL","HEBR","HIND","HIST","HONR","HUEN","HUMN","IAFS","IAWP","INBU","INDO","INFO","INVS","IPHY","ITAL","JOUR","JPNS","JRNL","JWST","KREN","LATN","LAWS","LDSP","LEAD","LGBT","LGTC","LIBB","LIBR","LING","MATH","MBAC","MBAX","MCDB","MCEN","MDRP","MDST","MEMS","MGMT","MILR","MKTG","MSBC","MSBX","MSEN","MSEN","MUEL","MUSC","MUSM","NAVR","NCBE","NCED","NCEN","NCFA","NCGK","NCHS","NCIE","NCMU","NCPS","NCSO","NCSP","NCSS","NCTM","NORW","NRLN","NRSC","OPIM","OPMG","ORMG","PACS","PHIL","PHYS","PMUS","PORT","PRLC","PSCI","PSYC","REAL","RLST","RUSS","SCAN","SEWL","SLHS","SNSK","SOCY","SPAN","SSIR","SSIR","SUST","SWED","TBTN","TDXD","THTR","TLEN","TMUS","WGST","WMST","WRTG","YIDD"];
subjectCode = subjectCodes.pop();
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
	
	for( var i = 0; i < document.getElementsByClassName( "PSGROUPBOX" ).length; i++ )
	{
		console.log( i );
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
		console.log( "Units " + ( units ? units.textContent : "nil" ) );
		console.log( "Restriction " + ( restriction ? restriction.textContent : "nil" ) );
		console.log( "Consent Required " + ( consent ? consent.textContent : "nil" ) );
		console.log( "Seats Remaining " + ( seats ? seats.textContent : "nil" ) );
		console.log( "Waitlist Total " + ( waitList ? waitList.textContent : "nil" ) );
		console.log( "MiscInfo " + ( miscInfo ? miscInfo.textContent : "nil" ) );
		console.log( "Instructor " + ( instructor ? instructor.textContent : "nil" ) );
		console.log( "Room " + ( room ? room.textContent : "nil" ) );
		console.log( "Meeting Time " + ( meetingTime ? meetingTime.textContent : "nil" ) );
		console.log( "Section " + ( section ? section.textContent : "nil" ) );
		console.log( "Class Code " + ( classNumber ? classNumber.textContent : "nil" ) );
		console.log( "Meeting Dates " + ( meetingDates ? meetingDates.textContent : "nil" ) );
		console.log( "Open Status " + ( openStatus ? openStatus : "nil" ) );
	}
	confirm("did some shit plz");
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
    subject.value = subjectCode;
    subject.onchange();
    submitAction_win0(document.win0,'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH');
	toggleOpenCourses();
}