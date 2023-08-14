


var submit = {
   
    extends : UI.Text,
    
    implementation: function(public, protected, private){
        protected.element = document.createElement("input");
        protected.element.type = "button";
        
        protected.formHandler = null;
        
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
        
        public.setText = function(x){
            protected.element.value = x;
        }
        public.setFocus = function(b){
            if ( b == true)
                protected.element.focus();
            else protected.element.blur();
        }

        public.onClick(function(){
            if (protected.formHandler != null && protected.formHandler.onCommand != null){
                protected.formHandler.onCommand(protected.fieldName);
            }
        });
        
        public.clearInput = function(){
            
        }
        
        public.getFieldValue = function(){
            return null;
        }
        
        public.isEnabled = function(){
            var v = protected.element.disabled;
            if (v == true) return false;
            else return true;
        }
        
        public.setEnabled = function(b){
            if (b== true) protected.element.disabled = null;
            else protected.element.disabled = true;
        }
    
    }
    
}

submit;