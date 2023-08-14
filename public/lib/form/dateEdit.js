

var text = {
    
    extends : UI.Input.Text,
    
    
    implementation: function(public, protected, private){
        public.use({ BorderRadius: 6, Border : {width: 1, color : "#cccccc" } })
        //protected.element.type = "text";
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
        
        public.clearInput = function(){
            public.setText("");
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
        
        public.onKeyUp(function(e){
            var d = protected.element;
            var pK = e ? e.which : window.event.keyCode;
            if (pK == 8) {d.value = substr(0,d.value.length-1); return;}
            var dt = d.value;
            var da = dt.split('/');
            for (var a = 0; a < da.length; a++) {if (da[a] != +da[a]) da[a] = da[a].substr(0,da[a].length-1);}
            if (da[0] > 31) {da[1] = da[0].substr(da[0].length-1,1);da[0] = '0'+da[0].substr(0,da[0].length-1);}
            if (da[1] > 12) {da[2] = da[1].substr(da[1].length-1,1);da[1] = '0'+da[1].substr(0,da[1].length-1);}
            if (da[2] > 9999) da[1] = da[2].substr(0,da[2].length-1);
                    dt = da.join('/');
            if (dt.length == 2 || dt.length == 5) dt += '/';
            d.value = dt; 
        });
        
        public.getDate = function(){
            var s = public.getText();
            if (s == null) return null;
            s = s.trim().split("/");
            if (s.length != 3) return null;
            var d = s[0]; var m = (parseInt(s[1],'10')-1); var a = parseInt(s[2]);
            var dt = new Date(a,m,d);
            return dt;
        }
        
        public.setDate = function(dt){
            var m = dt.getMonth()+1;
            if (m <= 9)
                m= "0"+m;
            
            var d = dt.getDate();
            if (d <= 9)
                d = "0"+d;
            
            public.setText(d+"/"+m+"/"+dt.getFullYear());
        }
        
        public.onExitFocus(function(){
            
        });
        
        public.isValid = function(){
            var txt = public.getText();
            if (txt.length != 10) return false;
            
        }
        
        public.onClick( function(){
            public.selectAll();
        });

    }
    
    
}

text;