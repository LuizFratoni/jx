
/*var year = {
    
    extends : UI.Text,
    
    implementation: function(public, protected, private){
        
        protected.year = 1900;
        
        public.use({ FontColor : "black",BorderRadius: 8, FontSize: 14, Text : "2014", FontWeight: "bold", Align: "center", MinWidth: 40, BorderBottom: {width: 1, color : "#cccccc", style: "dotted"}});
                
        public.setYearFromDate = function(date){
         
            protected.year = date.getFullYear();
            public.setText(protected.year);
        }
        
        public.setYear = function(id){
           protected.year = id;
           public.setText(protected.year); 
        }
        
        public.getYear= function(){
            return protected.year;
        }
        
        //////////////////////////////////////////////////////////////////
        
        public.onMouseOver(function(){
            public.use({BackgroundColor : "#f5f5f5"});
        });
        
        public.onMouseOut(function(){
            public.use({BackgroundColor : null});
        });
            

        
    }
    
    
};


year;*/




var yearButton = {
    
    extends  : UI.Text,
    
    implementation: function(public, protected, private){
        
        public.use({Height: 24, Width: 20, FontSize: 14, BorderRadius: 8, FontWeight: "bold", Align: "center"});
        
        public.onMouseOver(function(){
            public.setBackgroundColor("rgba(0,0,0,0.2)");
        });
        
        public.onMouseOut(function(){
            public.setBackgroundColor(null); 
        });
        
        public.setListener = function(l){
            protected.list = l;
        }
        

        
        public.onClick(function(){
            protected.list(); 
        });
        
    }
    
};


var year= {
    
    extends : UI.Container,
    
    implementation: function(public, protected, private){
        
        protected.year = 2014;
        
        public.use({ BorderRadius: 8,  Height: 30, BorderBottom: {width: 1, color : "#cccccc", style: "dotted"}});
                
        var title = New(UI.Text, { RelativeRect : { left: 5, top:5, bottom: 5, right: 5}, FontSize: 14, Text : "2014", FontWeight: "bold", Align: "center",   Text : "2014", Align: "center" });
        public.add(title);
        
        protected.title = title;
        
        var btnLess = New(yearButton, { RelativeRect : { left: 2, top: 2, bottom: 2},  Text : "-", FontWeight: 18, Visible: false });
        var btnMore = New(yearButton, { RelativeRect : { right: 2, top: 2, bottom: 2}, Text : "+", Visible: false }); 
                
        protected.btnLess = btnLess;
        protected.btnMore = btnMore;
        
        public.addMultiple([btnLess, btnMore]);        

        public.setYearFromDate = function(date){
         
            protected.year = date.getFullYear();
             protected.title.setText(protected.year);
        }
        
        public.setYear = function(id){
           protected.year = id;
           protected.title.setText(protected.year); 
        }
        
        public.getYear= function(){
            return protected.year;
        }
        
        //////////////////////////////////////////////////////////////////
        
        public.onMouseOver(function(){
            protected.btnLess.setVisible(true);
            protected.btnMore.setVisible(true);
            public.use({BackgroundColor : "#f5f5f5"});
        });
        
        public.onMouseOut(function(){
            protected.btnLess.setVisible(false);
            protected.btnMore.setVisible(false);
            public.use({BackgroundColor : null});
        });
        
        protected.btnLess.setListener(function(){
            protected.year--;
            if (protected.year < 1900)
                protected.year = 1900;
            
            public.setYear(protected.year);
            if (protected.userChanged != null)
                protected.userChanged(protected.year);
        });
            

        protected.btnMore.setListener(function(){
            protected.year++;
            public.setYear(protected.year);
            if (protected.userChanged != null)
                protected.userChanged(protected.year);
        });
        
        
        public.onUserChange= function(u){
            protected.userChanged = u;
        }
        
    }
    
    
};


year;