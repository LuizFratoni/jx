
var Check = {
    
    extends : UI.Text,
    
    implementation :function(public, protected, private){
        public.use({FontFamily: "autosig",Text : "", BackgroundColor : "white", FontSize: 18, FontWeight : "bold",  BorderRadius: 15,  Width:24, Align : "center", Height: 24, Border : { width : 2, color: "#cccccc" } } );
        protected.checked = false;
        protected.enabled = true;
        public.setChecked= function(b){
            protected.checked = b;
            if (b== true) {
                public.setText("\ue633");
                public.setBorder({ width : 2, color: "#303030" });
                if ( protected.onchange != null) protected.onchange(true);
            }
            else {
                public.setBackgroundColor(null);
                public.setText("");
                public.setBorder({ width : 2, color: "#cccccc" });
                if ( protected.onchange != null) protected.onchange(false);
            }
        }
        
        public.onMouseOver(function(){
            if (protected.enabled != true) return;
            public.setBorder({ width : 2, color: "#909090" });
        });
        
        public.onMouseOut(function(){
            if (protected.enabled != true) return;
            if(protected.checked == true){
                public.setBorder({ width : 2, color: "#303030" });
            } else{
                public.setBorder({ width : 2, color: "#cccccc" });
            }
        });
        
        public.onClick(function(){
            if (protected.enabled != true) return;
           public.setChecked(protected.checked == false); 
           if (protected.listener != null) 
            protected.listener.didCheckChange(protected.checked);
            if (public.didCheckChange != null) public.didCheckChange(protected.checked);
        });
        
        public.setListener = function(l){
            protected.listener = l;
        }
        
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == true)
                public.setOpacity(1);
            else public.setOpacity(0.4);
        }
     
        public.onChange = function(l){
            protected.onchange = l;
        }
        
        public.isChecked = function(){
            return protected.checked;
        }

    }
    
}

Check;