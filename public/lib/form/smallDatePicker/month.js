
var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

var monthButton = {
    
    extends  : UI.Text,
    
    implementation: function(public, protected, private){
        
        public.use({Height: 24, Width: 20, FontSize: 12, BorderRadius: 8, FontWeight: "bold", Align: "center"});
        
        public.onMouseOver(function(){
            public.setBackgroundColor("#e0e0e0");
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


var month = {
    
    extends : UI.Container,
    
    implementation: function(public, protected, private){
        
        protected.monthIndex = 0;
        
        public.use({ BorderRadius: 8,  Height: 30, BorderBottom: {width: 1, color : "#cccccc", style: "dotted"}});
                
        var title = New(UI.Text, { RelativeRect : { left: 5, top:5, bottom: 5, right: 5}, FontSize: 12, FontColor : "#909090", FontWeight:"bold",   Text : "Janeiro", Align: "center" });
        public.add(title);
        
        protected.title = title;
        
        var btnLess = New(monthButton, { RelativeRect : { left: 2, top: 2, bottom: 2},  Text : "-", FontWeight: 18, Visible: false });
        var btnMore = New(monthButton, { RelativeRect : { right: 2, top: 2, bottom: 2}, Text : "+", Visible: false }); 
                
        protected.btnLess = btnLess;
        protected.btnMore = btnMore;
        
        public.addMultiple([btnLess, btnMore]);        
        public.setMonthFromDate = function(date){
            protected.monthIndex = date.getMonth();
            protected.title.setText(meses[protected.monthIndex]);
        }
        
        public.setMonth = function(id){
           protected.monthIndex = id;
           protected.title.setText(meses[protected.monthIndex]); 
        }
        
        public.getMonth = function(){
            return protected.monthIndex;
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
            protected.monthIndex--;
            if (protected.monthIndex < 0)
                protected.monthIndex = 11;
            
            public.setMonth(protected.monthIndex);
            if (protected.userChanged != null)
                protected.userChanged(protected.monthIndex);
        });
            

        protected.btnMore.setListener(function(){
            protected.monthIndex++;
            if (protected.monthIndex > 11)
                protected.monthIndex = 0;
            public.setMonth(protected.monthIndex);
            if (protected.userChanged != null)
                protected.userChanged(protected.monthIndex);
        });
        
        
        public.onUserChange= function(u){
            protected.userChanged = u;
        }
        
    }
    
    
};


month;