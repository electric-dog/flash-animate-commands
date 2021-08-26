/********************************************************************************
 * Name			: open-config-folder
 * Description	: Opens the configuration folder of the currently opened host application (for Windows and Mac)
 * Author		: Vladin M. Mitov
 * License		: MIT
 ********************************************************************************/



(function(){

	var isWin	= ( Boolean( fl.version.search(/win/gi) != -1 ) ) ? true : false;
	var cmd		= ( isWin ) ? 'explorer ' : 'open ';
	var q       = ( isWin ) ? "" : "'";

	cmd = cmd + q + fl.configDirectory + q;
	FLfile.runCommandLine( cmd );	
	
})();