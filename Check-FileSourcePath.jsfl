function checkSourcePath(){
	
	var doc = fl.getDocumentDOM();
	
	if( ! doc ) return;
	
	var lib = doc.library, i, item, out = [], sep = "", t = " was";
	
	for( i = 0; i < lib.items.length; i++ ){
		
		item = lib.items[ i ];
		
		if( item.itemType === "folder" ) continue;
		
		if( item.sourceFilePath ){
			out.push( item.name );
		}
		
		
	}


	if( out.length > 0 ){
		sep = "\n======================\n";
	}
	if( out.length != 1 ){
		 t = "s were";
	}



	fl.outputPanel.clear();
	fl.trace( doc.path );
	fl.trace( out.join("\n") + sep + "DONE! " + i + " item" + t + " checked." );
}

checkSourcePath();