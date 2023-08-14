

var FileDragHost = {
    
    extends: UI.Text,
    
    implementation: function(public, protected, private){
        public.use({ Width: 200, Height: 10, BackgroundColor: "white", FontSize: 12,  Align : "center", FontColor: "#cccccc", Text : "Arraste aqui o Documento", Border : {width: 1, color : "#cccccc", style : "dashed"} , BorderRadius: 10});
        
          protected.element.ondragover = function(e){
            	/*e.stopImmediatePropagation(); */
                e.preventDefault(); 

                
                e.effectAllowed = "copy";
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.dropEffect = 'copy';
                
               // protected.txt.setText(e.dataTransfer.files[0].name);
                public.setInnerShadow({ left: 0, top: 0, size : 24, color : "rgba(200,100,0, 0.6)" });
                
             
           
                return true;
        }
        
        protected.element.ondragenter = function(e){
                
 
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.dropEffect = 'copy';
                e.preventDefault();
              //  e.stopImmediatePropagation();
                return true;
        }
        

        
      /*  public.onMouseMove(function(e){
            protected.mousePressed = e.button;
        })*/
        
        protected.element.addEventListener("dragleave", function(e){
            	//e.stopImmediatePropagation();
                 public.setInnerShadow(null);
                e.preventDefault();
               
                return true;
        }, false);
        
       /* protected.element.addEventListener("drag", function(e){
            	e.stopImmediatePropagation();
             //   e.preventDefault();
                return true;
        }, false);*/
        
        protected.element.addEventListener("drop", function(e){
             e.preventDefault();
            // e.stopImmediatePropagation();
             public.setInnerShadow(null);
            
           
            
            var files = e.dataTransfer.files;
            protected.dragListener(l);
            
        }, false);
        
        
        public.onDragFile = function(l){
            protected.dragListener = l;
        }
        
    }
    
    
};

FileDragHost;