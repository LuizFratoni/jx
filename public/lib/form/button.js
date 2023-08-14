
var iconButton = {
    
    extends : UI.Text,
    
    implementation : function(public, protected, private){
        
        public.use({Height: 40, BorderRadius: 6, Align: "center", FontSize: 16, FontFamily : "autosig", Width: 20, Height: 30});
        protected.enabled = true;
    
        public.onMouseOver(function(){
            if (protected.enabled == false) return;
            public.setOpacity(0.8);
        })
        
        public.onMouseOut(function(){
            if (protected.enabled == false) return;
            public.setOpacity(1); 
        });
        
        public.onMouseDown(function(){
            if (protected.enabled == false) return;
           public.setOpacity(0.6); 
        });
        
        public.onMouseUp(function(){
            if (protected.enabled == false) return;
           public.setOpacity(0.8); 
        });
        
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == true){
                public.setOpacity(1);
            } else{
                public.setOpacity(0.2); 
            }
        }
        
    }
    
    
};

Class.register("form/iconButton", iconButton)

var button = {
    
    extends : UI.Text,
    
    implementation : function(public, protected, private){
        
        public.use({Height: 40, BorderRadius: 12, MinWidth: 100, Align: "center"});
        protected.enabled = true;
        
        public.onMouseOver(function(){
            if (protected.enabled == false) return;
            public.setOpacity(0.8);
        })
        
        public.onMouseOut(function(){
            if (protected.enabled == false) return;
            public.setOpacity(1); 
        });
        
        public.onMouseDown(function(){
            if (protected.enabled == false) return;
           public.setOpacity(0.6); 
        });
        
        public.onMouseUp(function(){
            if (protected.enabled == false) return;
           public.setOpacity(0.8); 
        });
        
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == true){
                public.setOpacity(1);
            } else{
                public.setOpacity(0.2); 
            }
        }
        

        
    }
    
    
};

button;