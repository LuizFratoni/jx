var simpleBg = New(UI.Brushes.LinearGradient);
simpleBg.vertical("#ffffff", "#eeeeee");
var pressedBg = New(UI.Brushes.LinearGradient);
pressedBg.vertical("#cccccc", "#e0e0e0");


var SimpleButton = {
 
    extends : UI.Container,
    
    implementation: function(public, protected,private){
        
        
        public.use({ Orientation: "horizontal", Height: 23, Padding: 4, PaddingRight: 8, BackgroundBrush: simpleBg} );
        protected.enabled = true;
        protected.icon = public.add(New(UI.Text, { Height: 23, FontFamily : "Material Icons", FontSize: 18, Width: 23, Align: "center"  } ));
        protected.title = public.add(New(UI.Text, { MarginLeft:4, FontColor: "#454545", Height: 23,  FontSize: 12, FontWeight: "bold" } ));
        
        
        public.setText = function(t){
            protected.title.setText(t);
        }
        
        public.setIcon = function(icon){
            protected.icon.setText(icon);
        }
        
        public.setTextAttr = function(attr){
            protected.title.use(attr);
        }
        
        public.setIconAttr = function(icon){
            protected.icon.use(icon);
        }
        
        public.onMouseDown(function(){
            if (protected.enabled == false) return;
   
        })

        public.onMouseOver(function(){
            if (protected.enabled == false) return;
            protected.icon.setFontColor("#454545");
            protected.title.setFontColor("#454545");
        })
        
        public.onMouseUp(function(){
            if (protected.enabled == false) return;
    
        })
        
        public.onMouseOut(function(){
           if (protected.enabled == false) return;
           protected.icon.setFontColor("#000000");
           protected.title.setFontColor("#000000");
        });
        
        
        protected.oldClick = public.onClick;
        
        protected.oldClick(function(){
            if (protected.enabled != true) return;
                protected.clickListener();
           
        });
        
        public.onClick = function(listener){
            protected.clickListener = listener;
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