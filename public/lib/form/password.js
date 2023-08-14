

var text = {
    
    extends : UI.Input.Password,
    
    
    implementation: function(public, protected, private){
        public.use({ Border : {width: 1, color : "#cccccc" } })
        
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

    }
    
    
}

text;