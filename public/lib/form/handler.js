


var formHandler = {
    implementation: function(public, protected, private) {

        protected.inputOrder = [];

        public.setOrdenation = function(items) {
            protected.inputOrder = items;
        }       
        
        public.selectFirst = function(){
            var first = protected.inputOrder[0];
            if (first != null)
                first.setFocus(true);
        }
        
        public.selectNextControl = function(ctrl) {
           
            var found = false;
            protected.inputOrder.forEach(function(item) {
                if (found == true) {
                    if (item.isEnabled() == true && item.setFocus != null){
                          item.setFocus(true);
                          found = false;   
                    } 
                }
                if (item == ctrl) {
                    found = true;
                }
            });
            if (found == true)
                public.notifyEnd();
        }
        
  
        public.selectPreviousControl = function(ctrl) {
            var found = false;
            var prev = null;
            protected.inputOrder.forEach(function(item) {
                if (item == ctrl) {
                    if (prev != null) {
                        prev.setFocus(true);
                    }
                }
                prev = item;
            });
        }

        /////////////////////////////////////////////////////
        
        public.pushOrderList = function(input){
              protected.inputOrder.push(input);
        }

        /////////////////////////////////////////////////////////      

        public.notifySelected = function(ctrl) {
            if (protected.onselectControl != null)
                protected.onselectControl(ctrl);
        }

        public.notifyInvalid = function(ctrl, text) {
            if (protected.onnotifyInvalid != null)
                protected.onnotifyInvalid(ctrl);
        }

        public.notifyChanged = function(ctrl) {
            if (protected.onchanged != null)
                protected.onchanged(ctrl);
        }

        public.notifyEnd = function(ctrl) {
            if (protected.oncompletefields != null)
                protected.oncompletefields(ctrl);
        }

        public.notifyHint = function(ctrl) {
            if (protected.onhint != null)
                protected.onhint(ctrl);
        }

        //////////////////////////////////

        public.onFieldSelected = function(callback) {
            protected.onselectControl = callback;
        }

        public.onFieldInvalid = function(f) {
            protected.onnotifyInvalid = f;
        }

        public.onFieldChanged = function(f) {
            protected.onchanged = f;
        }

        public.onCompleteFields = function(f) {
            protected.oncompletefields = f;
        }

        public.onHint = function(f) {
            protected.onhint = f;
        }
        
        public.clearInputs = function(){
            protected.inputOrder.forEach(function(i){
                i.clearInput();
            });
        }
        
        
        public.getValues = function(){
            var data = {};
            var name;
            protected.inputOrder.forEach(function(i){
                console.log("Getting Value of ")
                name = i.getFieldName();
                console.log("Getting Value of "+name)
                if (name != null){
                    data[name] = i.getValue();
                }
            });
            console.log("All values GEtted");
            return data;
        }

        public.getData = function(){
            return public.getValues();
        }
        
        public.setValues = function(data){
            
            protected.inputOrder.forEach(function(i){
                for (var name in data){
                    if (i.setValue != null)
                        i.setValue(data[name]);
                }   
            });
        }
        
        
        public.setFieldValue = function(name, value){
            protected.inputOrder.forEach(function(i){
                if (name == i.getFieldName()){
                    if (i.setValue != null)
                        i.setValue(value);
                    return false;
                }   
            });
        }
        
        public.getField = function(name){
            var field;
             protected.inputOrder.forEach(function(i){
                if (name == i.getFieldName()){
                    field = i;
                    return false;
                }   
            });
            return field;
        }
        
        public.getFieldValue = function(name){
            var field;
             protected.inputOrder.forEach(function(i){
                if (name == i.getFieldName()){
                    field = i.getValue();
                    return false;
                }   
            });
            return field;
        }
        
        public.isReadOnly = function(){
            return protected.readOnly;
        }
        public.setReadOnly = function(b){
            if (b == null) b = true;
            if (protected.readOnly == b) return;
            protected.readOnly = b;
            
            protected.inputOrder.forEach(function(i){
                i.setReadOnly(b);
            });
        }

        public.edit = function(){
            protected.readOnly = false;
            protected.inputOrder.forEach(function(i){
                if (i.setReadOnly != null) {
                    i.setReadOnly(false);
                }
            });
        }

        public.cancelEdit = function(){
            protected.inputOrder.forEach(function(i){
                if (i.cancelEdit != null) {
                    i.cancelEdit();
                }
            });
            return true;
        }

        public.getChanges = function(ch){
            var changes = ch;
            if (changes == null) changes = {};
            protected.inputOrder.forEach(function(i){
                if (i.isModified != null && i.isModified() == true){
                    changes[i.getFieldName()] = i.getValue();
                }
            });
            return changes;
        }

        public.saveEdit = function(){
            protected.inputOrder.forEach(function(i){
                if (i.saveEdit != null) i.saveEdit();
            });
        }

        public.isModified = function(){
            var result = false;
            protected.inputOrder.forEach(function(i){
                if (i.isModified != null && i.isModified() == true){
                   result = true;
                   return false;
                }
            });
            return result;
        }

        public.setData = function(data){
            var inp;
            for (var field in data){
                console.log("Setando Campo "+field);
                inp = public[field];
                try{
                    if (inp != null && inp.setValue != null){
                        inp.setValue(data[field]);
                    }
                } catch( e){
                    console.warn("Erro Setando Campo "+field);
                }
            }

        }

        

    }


}


formHandler;