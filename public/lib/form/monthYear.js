
var Meses = [ "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

var MonthYear = {
    
    extends : UI.Input.Text,
    
    
    implementation: function(public, protected, private){
        public.use({BorderRadius: 6, Border : {width: 1, color : "#cccccc" } })
        protected.date  = new Date();
        protected.month = protected.date.getMonth();
        protected.year = protected.date.getFullYear();
        protected.started = false;
        
       // public.setText(Meses[protected.month]+"/"+protected.year);
        
        protected.formHandler = null;
        protected.premeditateChanging = false;
        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null)
                protected.formHandler[protected.fieldName] = public;
            f.pushOrderList(public);
        } 
        
        public.setFieldName = function(name){
            protected.fieldName = name;
            if (protected.formHandler != null)
                 protected.formHandler[name] = public;
        }
        
        public.getFieldName = function(){
            return protected.fieldName;
        }
        
        public.onPressEnter(function(){
            if (protected.formHandler != null){
                if (protected.listener) {
                    var result = protected.listener();
                    if (result == false)
                       return;
                    
                }
                protected.premeditateChanging = true;
                protected.formHandler.selectNextControl(public);
            }
        });
        
        public.today = function(){
            protected.started = true;
            var dt = new Date();
            protected.month = dt.getMonth();
            protected.year  = dt.getFullYear();
            public.setText(Meses[protected.month]+"/"+protected.year);
        }
        
        protected.element.onkeydown= function(event){
            if (event.keyCode == 46){
                public.setText("");
            }
            if (event.keyCode == 13) {return true; }
            event.preventDefault();
            if(event.keyCode == 40 || event.keyCode == 39) {
                if (protected.started == false){
                     protected.started = true;
                     var dt = new Date();
                     protected.month = dt.getMonth();
                     protected.year  = dt.getFullYear();
                     public.setText(Meses[protected.month]+"/"+protected.year);
                }
                else public.inc(1);
            } else if (event.keyCode == 38 | event.keyCode == 37){
                if (protected.started == false){
                      protected.stated = true;
                     var dt = new Date();
                     protected.month = dt.getMonth();
                     protected.year  = dt.getFullYear();
                     public.setText(Meses[protected.month]+"/"+protected.year);
                }
                public.dec(1);
            }
            
            /*
             * left = 37
                up = 38
r           ight = 39
down = 40
             * 
             * 
             */
            
        }
        
        public.isEmpty = function(){
            return protected.month != null && protected.month >= 0;
        }
        
        public.clearInput = function(){
            public.setText("");
        }
        
        
        public.getMonth = function(){
            return protected.month;
        }
        
        public.getYear = function(){
            return protected.year;
        }
        
        public.setMonthYear = function(m, y){
            protected.month = m;
            protected.year = y;
        }
        
        public.getFieldValue = function(){
            return public.getText();
        }
        
        public.setFieldValue = function(value){
            public.setText(value);
        }
        
        
        public.onValueChanged = function(l){
            protected.listener = l;
        }
        
        public.onExitFocus(function(){
            if (protected.premeditateChanging == true){
                protected.premeditateChanging = false;
                return;
            }
            if (protected.listener) protected.listener();
        });
        
        public.onClick( function(){
            public.selectAll();
        });
        
        
        ///////////////////////////////////////////////////
        
        public.inc = function(i){
            if (i <= 0) i = 1;
            protected.month += i;
            if (protected.month > 11){
                protected.month = 0;
                protected.year++;
            }
            
            public.setText(Meses[protected.month]+"/"+protected.year);
        }
        
        public.dec = function(i){
            if (i <= 0) i = 1;
            protected.month -= i;
            if (protected.month < 0){
                protected.month = 11;
                protected.year--;
            }
            
            public.setText(Meses[protected.month]+"/"+protected.year);
        }

    }
    
    
}

MonthYear;