   if( ! $('#myCanvas').tagcanvas({
     textColour : '#2ECCFA',
     //outlineThickness : 1,
     height: 80, 
     maxSpeed : 0.08,
     depth : 0.9, 
     wheelZoom: false
   })) {
     // TagCanvas failed to load
     $('#myCanvasContainer').hide();
   }