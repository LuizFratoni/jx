var simpleBg = New(UI.Brushes.LinearGradient);
simpleBg.vertical("#ffffff", "#eeeeee");
var pressedBg = New(UI.Brushes.LinearGradient);
pressedBg.vertical("#cccccc", "#e0e0e0");


var SimpleButton = {
 
    extends : UI.Text,
    
    implementation: function(public, protected,private){
        
        
        public.use({ Height: 20, Width: 20, FontSize: 12, BackgroundBrush: simpleBg, Align: "center", Border: { width: 1, color : "#d0d0d0"}, BorderRadius: 4  } );
        
        public.onMouseDown(function(){
            if (protected.enabled == false) return;
            public.setBackgroundBrush(pressedBg);
        })
        
        public.onMouseUp(function(){
            if (protected.enabled == false) return;
            public.setBackgroundBrush(simpleBg);
        })
        
        public.onMouseOut(function(){
           if (protected.enabled == false) return;
            public.setBackgroundBrush(simpleBg); 
        });
        
        
        public.onClick(function() {
            
        })
        

        public.isEnabled = function(){
            if (protected.enabled == false) return false;
            return true;
        }
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == false)
                public.setOpacity(0.2);
            else public.setOpacity(1);
        }
        
        
    }
}

SimpleButton;