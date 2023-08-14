
var dateCell = {
    
    extends : UI.Text,
    
    implementation: function(public, protected, private){
        public.use({Width: 30, Height: 20, BorderRadius: 10, FontSize: 11, Align: "center", FontColor : "#909090", Text : "00"} )
        protected.enabled = true;
        protected.selected= false;
        
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == false){
                public.setFontColor("#e0e0e0");
            } else
                public.setFontColor("#909090");
        }
        
        public.setSelected = function(sel){
            protected.selected = sel;
        }
        
        ////////////
        
        public.setDatePicker = function(l){
            protected.picker = l;  
        }

        public.onMouseOver(function(){
           if (protected.enabled == false || protected.selected == true) return;
           public.setBackgroundColor("#f0f0f0");
        });
        
        public.onMouseOut(function(){
           if (protected.enabled == false || protected.selected == true) return;
           public.setBackgroundColor(null);
        });
        
        public.onMouseUp(function(){
            if (protected.enabled == false || protected.selected == true) return;
           public.setBackgroundColor(null); 
        });
        
        public.onMouseDown(function(){
            if (protected.enabled == false || protected.selected == true) return;
            public.setBackgroundColor("#cccccc");
            protected.picker.didSelectCell(public);
        });
        
        public.onClick(function(){
            if (protected.enabled == false || protected.selected == true) return;
            protected.picker.didCellClick(public);
        })
        
    }
    
};

var dateWeek = {
    
    extends : UI.Text,
    
    implementation: function(public, protected, private){
        public.use({Width: 30, Height: 21, FontSize: 11, Align: "center", FontColor : "#303030", Text : "00"} )
        
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


var datePicker = {
    
    extends : UI.Container,
    
    implementation: function(public, protected, private){
        protected.curCell = null;
        protected.monthId = 0;
        protected.yearNumber = 2014;
        public.use({Width: 280, Height: 260,  BackgroundColor : "white"});
        
        var header = New(UI.Container, {RelativeRect : { left: 0, top: 0, right: 0}, Height: 31});
        var content = New(UI.Container, {Orientation : "vertical", RelativeRect : { top : 40, left: 0, right: 0, bottom: 0}});
        var month = New("form/smallDatePicker/month", {Left: 0, Top:0, Width: 130, Height: 30});
        
        var year = New("form/smallDatePicker/year", {Left: 140, Top: 0,Width: 60, Height: 30});
        
        public.add(header);
        public.add(content);
        header.add(month);
        header.add(year);
        protected.month = month;
        protected.year  = year;
        
        month.onUserChange(function(mt){
            protected.monthId = mt;
            protected.prepareCalendar(mt, protected.yearNumber);
        });
        
        year.onUserChange(function(mt){
            protected.yearNumber = mt;
            protected.prepareCalendar(protected.monthId, protected.yearNumber);
        });
        ////////////////////////////////////////////
        
        var cells = [];
        var row   = New(UI.Container, {Orientation: "horizontal", Height: 31, MarginBottom: 4});
        content.add(row);
        row.addMultiple([
            New(dateWeek, {Text : "D"}),
            New(dateWeek, {Text : "S"}),
            New(dateWeek, {Text : "T"}),
            New(dateWeek, {Text : "Q"}),
            New(dateWeek, {Text : "Q"}),
            New(dateWeek, {Text : "S"}),
            New(dateWeek, {Text : "S"}),
        ]);
        content.add(row);
        
        
        var cell;
        for (var i = 0; i < 42; i++ ){
            if ( i % 7 == 0){
                 row   = New(UI.Container, {Orientation: "horizontal", Height: 21});
                 content.add(row);
            }
            
            cell = New(dateCell, {DatePicker : protected});
            row.add(cell);
            cells.push(cell);
            
            
        }
        protected.cells = cells;
        ///////////////////////////////////////////////////////////////
        

        protected.prepareCalendar = function(month, year){
            protected.monthId = month;
            protected.yearNumber = year;
             var dt = new Date();
             dt.setDate(1);
             dt.setFullYear(year);
             dt.setMonth(month);
             var weekday = dt.getDay();
             var monthLen = getMonthLength(month, year);
                
             var lastYear, lastMonth;
             if (month == 0){
                 lastMonth = 11;
                 lastYear = year-1;
             } else{
                 lastYear = year;
                 lastMonth = month-1;
             }
             
             var lastMonthLen =  getMonthLength(lastMonth, lastYear);
             
             var cell = 0;
             var fillCell = weekday;
             if (weekday == 0) fillCell = 7;
             
             //Preenche datas antigas
             var cells = protected.cells;
             for(var i = 0; i< fillCell; i++){
                 cells[i].use({Enabled : false, Text : lastMonthLen-(fillCell-1-i)});
             }

             //Preenche Datas do Mes corrente
             for (var i = 1; i <= monthLen; i++){
                 cells[i+fillCell-1].use({Enabled : true, Text : i});
             }
             
             //Preenche datas do Mes seguinte
             for (var i = 1; i <= 42-fillCell-monthLen; i++){
                 cells[i+fillCell+monthLen-1].use({Enabled : false, Text : i});
             }
        }
        
        public.setDate = function(dt){
            protected.month.setMonth(dt.getMonth());
            protected.year.setYear(dt.getFullYear());
            protected.prepareCalendar(dt.getMonth(), dt.getFullYear());            
        }
        
        
        ////////////////////////////////////////////////////////////////
        
        protected.didSelectCell = function(cell){
          /*  if (protected.curCell != null)
                protected.curCell.setSelected(false);
            
            protected.curCell = cell;
            cell.setSelected(true);*/
        }
        
        protected.didCellClick = function(cell){
            var date = new Date();
            
            date.setMonth(protected.monthId);
            date.setFullYear(protected.yearNumber);
            date.setDate(cell.getText());
            
            if (protected.listener != null)
                protected.listener(date);
        }
        
        
        //////////////////////////////////////////
        
        public.setListener = function(l){
             protected.listener = l;           
        }
        
    }
    
}

datePicker;