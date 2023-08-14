

var date = {
    
    
    extends : UI.Container,
    
    implementation : function(public,protected, private){
        
        public.use({Orientation: "horizontal", Height: 32, Width: 300});
        
        var day = New("form/datePicker/day", {Width: 60, Float : "left", PositionMode : "relative"});
        var month = New("form/datePicker/month", {Width: 150, Float : "left", PositionMode : "relative"});
        var year = New("form/datePicker/year", {Width: 90, Float : "left", PositionMode : "relative"});
        
        protected.day = day;
        protected.month = month;
        protected.year = year;
        
        protected.month.onUserChange(function(mt){
            protected.day.setMonth(mt);
        });
        
        protected.year.onUserChange(function(mt){
            protected.year.setYear(mt);
        });
        
        
        public.addMultiple([day, month, year]);

        public.setDate = function(date){
            protected.year.setYear(date.getFullYear());
            protected.month.setMonth(date.getMonth());
            protected.day.setRange(date.getMonth(), date.getFullYear());
            protected.day.setDay(date.getDate());
            
        }
        
        public.getDate = function(){
            var m, y, d;
            m = protected.month.getMonth();
            y = protected.year.getYear();
            d = protected.day.getDay();
            var dt = new Date();
            dt.setFullYear(y);
            dt.setMonth(m);
            dt.setDate(d);
            return dt;
            
        }
    }
    
    
};


date;