var simpleBg = New(UI.Brushes.LinearGradient);
simpleBg.vertical("#ffffff", "#eeeeee");
var pressedBg = New(UI.Brushes.LinearGradient);
pressedBg.vertical("#cccccc", "#e0e0e0");


var SimpleButton = {
 
    extends : UI.Container,
    
    implementation: function(public, protected,private){
        
        
        public.use({ Orientation: "horizontal", Height: 30, Width: 132,  BackgroundBrush: simpleBg,  Border: { width: 1, color : "#d0d0d0"}, BorderRadius: 4  } );
        protected.enabled = true;
        protected.icon = public.add(New(UI.Text, { Height: 30, FontFamily : "Material Icon", FontSize: 18, Width: 30, Align: "center"  } ));
        protected.title = public.add(New(UI.Text, { Height: 30,  FontSize: 12 } ));
        
        
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