/********************************************************************************
 * Name			: random-first-frame
 * Description	: Sets the 'first frame' property of the selected instances
 * Author		: Vladin M. Mitov
 * License		: MIT
 ********************************************************************************/



(function(){
	
	var doc = fl.getDocumentDOM();
	
	if( ! doc ) return;
	
	var i, sel = doc.selection,
		element, startFrame, min = 0, max;
	
    if( doc.selection.length === 0 ){
        alert( "Select at least one graphic symbol on the stage." );
        return;
    }
	
    for( i = 0; i < sel.length; i++ ){
        element = sel[ i ];
        if( element.elementType === "instance" ){
            if( element.instanceType === "symbol" ){
                if( element.symbolType === "graphic" ){
                    max = element.libraryItem.timeline.frameCount;
                    element.firstFrame = Math.floor( Math.random() * ( max - min + 1) ) + min;
                }
            }
        }
    }
	// Force Flash to refresh the stage
	doc.scaleSelection( 1, 1 );	
})();