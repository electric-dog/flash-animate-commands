/********************************************************************************
 * Name			: export-animation-from-selected-frames
 * Description	: Exports selected timeline frames as JSON
 * Author		: Vladin M. Mitov
 * License		: MIT
 ********************************************************************************/

(function(){

	fl.runScript( fl.configURI + "Commands/JSON2.jsfl" ) // https://github.com/douglascrockford/JSON-js/blob/master/json2.js
	var report = {};
	
	exportAnimationFromSelectedFrames( report );
	
	
	fl.trace( ( JSON ) ? JSON.stringify( report ) : report );
	
	function exportAnimationFromSelectedFrames( r ){

		var doc = fl.getDocumentDOM();
		var myTimeline = doc.getTimeline();
		var i, j, myLayer, ln, myFrame;
		var selectedFrames = myTimeline.getSelectedFrames();
		var frmreport;
		
		if( selectedFrames.length === 0 ){
			fl.trace( "Select timeline frames to work on." );
			return;
		}
		
		// Loop through 'selected frames'
		for( i = 0; i < selectedFrames.length; i+=3 ){
			
			myLayer = myTimeline.layers[ selectedFrames[ i ] ];

			// Skip timeline folders
			if( myLayer.layerType === "folder" ) continue;
			
			ln = "Layer " + selectedFrames[ i ];
			
			r[ ln ] = [];
			
			for( j = selectedFrames[i+1]; j < selectedFrames[i+2]; j++ ){
				
				myFrame = myLayer.frames[ j ];
				
				// Skip empty frames
				if( ! myFrame ) continue;
				
				// get frame properties
				if( isKeyFrame( myLayer, j ) ){
					
					frmreport = {
						 frame		: j
						,label		: myFrame.name
						,duration	: myFrame.duration
					};
					r[ ln ].push( frmreport );
					
					getElementProperties( myFrame, frmreport );
				}
			}
			
		}
	}

	function isKeyFrame( aLayer, frameNum ){
		if( ! aLayer.frames[ frameNum ] ) return false;
		return ( aLayer.frames[ frameNum ].startFrame === frameNum );
	}
	
	function getElementProperties( fr, r ){
		
		if( fr.elements.length > 1 ) return;
		
		var el = fr.elements[ 0 ];
		
		if( el.elementType != "instance" ) return;
        if( el.instanceType != "symbol" ) return;
		
		var props = ( fr.useSingleEaseCurve ) ?
			[ "all" ] :
			[ "position", "rotation","scale", "color" ];
		
		var i, p, ease = {};
		
		for( i = 0; i < props.length; i++ ){
			p = props[ i ];
			ease[ p ] = fr.getCustomEase( p );
		}
		
		r.ease = ease;

		r[ el.libraryItem.name.split("/").pop() ] = {
			 x			: el.x
			,y			: el.y
			,width		: el.width
			,height		: el.height
			,rotation	: el.rotation
			,scaleX		: el.scaleX
			,scaleY		: el.scaleY
			,opacity	: el.colorAlphaPercent
			,firstFrame	: ( el.symbolType === "graphic" ) ? el.firstFrame : 0 
			,loop		: ( el.symbolType === "graphic" ) ? el.loop : "n/a" 
		}
	}

})();