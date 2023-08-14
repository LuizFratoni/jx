

var input = {

    extends : UI.Input.Text,
    version: "1.0.0.0",
    
    implementation: function(public, protected, private){
        
        protected.hint = "";
        protected.title = "";
        
        public.setHint = function(h){
            protected.hint = h;            
        }
        
        public.setDescription = function(title){
            protected.title = title;
        }
        
        public.getHint = function(){
            return protected.hint;
        }
        
        public.getDescription = function(){ 
            return protected.description;
        }
        
        public.setFormHandler = function(f){
            protected.formHandler = f;
        }
        
        public.setHandler = function(f){
            protected.formHandler = f;
        }
        
        public.onPressEnter(function(){
            if (protected.formHandler != null)
                protected.formHandler.selectNextControl(public);
        });
        
        public.onPressEsc(function(){
            if (protected.formHandler != null)
                protected.formHandler.selectPreviousControl(public);
        });
        
        public.isValid = function(){
            return true;
        }
        
        public.onFocus(function(){
            if (protected.formHandler != null)
                protected.formHandler.notifySelected(public);
        });
        
    }
    
}

input;


