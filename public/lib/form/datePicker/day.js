

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

function getMonthLength(month,year){
	if (month == 3 || month == 5 || month == 8 || month == 10)
		return 30;

	if (month == 1) {
		var isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
		if (isLeapYear == true) return 29;
		else return 28;
	}

    return 31;
}



var day= {
    
    extends : UI.Container,
    
    implementation: function(public, protected, private){
        
        protected.day = 1;
        protected.monthLen = 31;
        protected.month = 1;
        protected.year = 2014;
        
        public.use({ BorderRadius: 8,  Height: 30, BorderBottom: {width: 1, color : "#cccccc", style: "dotted"}});
                
        var title = New(UI.Text, { RelativeRect : { left: 5, top:5, bottom: 5, right: 5}, FontSize: 14, Text : "2014", FontWeight: "bold", Align: "center",   Text : "1", Align: "center" });
        public.add(title);
        
        protected.title = title;
        
        var btnLess = New(yearButton, { RelativeRect : { left: 2, top: 2, bottom: 2},  Text : "-", FontWeight: 18, Visible: false });
        var btnMore = New(yearButton, { RelativeRect : { right: 2, top: 2, bottom: 2}, Text : "+", Visible: false }); 
                
        protected.btnLess = btnLess;
        protected.btnMore = btnMore;
        
        public.addMultiple([btnLess, btnMore]);        

        public.setDayFromDate = function(date){
         
            protected.day = date.getDate();
             protected.title.setText(protected.day);
        }
        
        public.setDay = function(id){
           protected.day= id;
           protected.title.setText(protected.day); 
        }
        
        public.getDay= function(){
            return protected.day;
        }
        
        
        public.setRange = function(month, year){
            protected.month = month;
            protected.year = year;
            protected.monthLen = getMonthLength(month, year);
            if (protected.day > protected.monthLen){
                public.setDay(protected.monthLen);
            }
        }
        
        public.setMonth = function(month){
            public.setRange(month, protected.year);     
        }
        
        public.setYear = function(year){
            public.setRange(protected.month, year);     
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
            protected.day--;
            if (protected.day < 1)
                protected.day = 1;
            
            if (protected.day> protected.monthLen)
                protected.day = protected.monthLen;
            
            public.setDay(protected.day);
            if (protected.userChanged != null)
                protected.userChanged(protected.day);
        });
            

        protected.btnMore.setListener(function(){
            protected.day++;
            if (protected.day > protected.monthLen)
                protected.day = protected.monthLen;
            public.setDay(protected.day);
            if (protected.userChanged != null)
                protected.userChanged(protected.year);
        });
        
        
        public.onUserChange= function(u){
            protected.userChanged = u;
        }
        
    }
    
    
};


day;
