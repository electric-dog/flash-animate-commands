/********************************************************************************
 * Name			: Copy-Or-Move-Frames
 * Description		: Copy selected frames to a new layer.
 * Author		: Vladin M. Mitov
 * License		: MIT
 ********************************************************************************/
(function(){
			
	var doc = fl.getDocumentDOM();

	if( ! doc ){
		alert( "No document open." );
		return;
	}
	
	var tml = doc.getTimeline();
	var sel = tml.getSelectedFrames();
	
	if( sel.length != 3 ){
		alert( "Make a contiguous selection on one layer in the timeline." );
		return;
	}
	
	var myLayer = tml.layers[ sel[0] ];
	
	if( myLayer.layerType === "folder" ){
		alert( "Select a non-folder layer." );
		return;
	}
	
	var startFrame = sel[1], endFrame = sel[2];
	var newLayerName;
	
	// Change this to "move" if you want to move the frames instead of copy them.
	var action = "copy";

	if( action === "copy" ){
		tml.copyFrames( startFrame, endFrame );
		newLayerName = "Copy of " + myLayer.name + " ( "+ (startFrame+1) + "-" + endFrame + " )";
	}else if( action === "move" ){
		tml.cutFrames( startFrame, endFrame );
		newLayerName = "Moved from " + myLayer.name + " ( "+ (startFrame+1) + "-" + endFrame + " )";
	}
		
		
	tml.addNewLayer( newLayerName );
	tml.convertToBlankKeyframes( startFrame, endFrame );
	tml.pasteFrames( startFrame, endFrame );

})();
