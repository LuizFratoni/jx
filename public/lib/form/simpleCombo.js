


var combo = {
    
    extends : UI.Input.Combo,
    
    
    implementation: function(public, protected, private){
        public.use({ Border : {width: 1, color : "#ffffff" }, BorderRadius: 6 })
        protected.element.style.lineHeight = "20px";
        
        protected.formHandler = null;
        protected.modified = false;
        protected.value = null;
        protected.index = 0;

        public.isModified = function(){
            return protected.modified;
        }

        
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
        
        public.onChange(function(l){
            protected.modified = true;
        });

        public.onPressEnter(function(){
            if (protected.formHandler != null){
                protected.formHandler.selectNextControl(public);
            }
        });
        
        public.clearInput = function(){
            if (protected.element.options.length > 0)
                protected.element.selectedIndex = 0;
           // public.setText("");
        }
       
        public.getFieldValue = function(){
            return public.getSelected();
        }
        
        protected.oldSetReadOnly = public.setReadOnly;
        public.setReadOnly = function(b){
            if (b == null) b = true;
            if (b == true){
                protected.oldSetReadOnly(true);
                protected.element.enabled = false;
                public.setBackgroundColor("transparent");
                public.setBorder({width : 1, color : "transparent"});
            } else{
                protected.oldSetReadOnly(false);
                protected.element.enabled = true;
                public.setBorder({width : 1, color : "#cccccc"});
                public.setBackgroundColor("#ffffff");
            }
        }

        public.cancelEdit = function(){
            protected.element.selectedIndex = protected.index;
            protected.modified = false;
        }

        public.saveEdit = function(){
            protected.modified = false;
            protected.index = protected.element.selectedIndex;
            if (protected.index < 0){
                protected.value = null;
                return;
            }
            var obj = protected.element.options[protected.index];
            if (obj != null){
                protected.value = obj.value;
            } else protected.value = null;
        }

        public.getValue = function(){
            return public.getSelectedId();
        }
    
        public.setValue = function(data){
            protected.modified = false;
            if (data == null){
                protected.index = -1;
                protected.value = null;
                protected.element.selectedIndex = -1;
            } else {
                if (public.setSelectedId(data.id) != true){
                    var o = public.addItem(data, protected.lastParams);
                    protected.element.selectedIndex = o.index;
                    protected.index = o.index;
                    protected.value = o.value;
                }
                
            }
        }

        public.setSelected = function(data){
            public.setValue(data);
        }

        
        public.setSelectedIndex = function(index){
            protected.modified = false;
            protected.element.selectedIndex = index;
            protected.index = index;
            protected.value = protected.element.options[index].value;
        }

    
        public.setSelectedId = function(id){
            protected.modified = false;
            
            if (id == null){
                protected.index = -1;
                protected.value = null;
                protected.element.selectedIndex = -1;               
            }
            var idx = 0;
            for( var i = 0; i < protected.element.options.length; i++){
    
                if (protected.element.options[i].value == id)
                {
                    protected.element.selectedIndex = idx;
                    protected.value = id;
                    protected.index = idx;
                    return true;
                }
                idx++;
            }
            return false;
        }

        public.addItems = function(data, params){
            var capId = "id";
            var capText = "text";
            protected.lastParams = params;
             if (params != null){
                if (params.text != null) capText = params.text;
                if (params.id != null) capId = params.id;
            }
    
            data.forEach(function(entry){
                if (entry != null)
                    public.add(entry[capText], entry[capId]);
            });
        }
    
        public.addItem = function(data, params){
            var capId = "id";
            var capText = "text";
            protected.lastParams = params;
             if (params != null){
                if (params.text != null) capText = params.text;
                if (params.id != null) capId = params.id;
            }
    
                if (data!= null)
                    public.add(data[capText], data[capId]);
    
        }

        
        public.setBinding = function( args){

            protected.api = args.api || args.gateway;
            protected.url = args.url;
            protected.idField = args.id || "id";
            protected.labelField = args.label;

            public.refresh();
        }


        public.refresh = function(){
            public.clear();
            public.add("", null);
            protected.api.get(protected.url, function(data){
                var label;
                var id;
                data.forEach(function(entry){   
                    label = null;
                    id = null;
                    if (entry != null){
                        if (protected.idField != null) id = entry[protected.idField];
                        if (protected.labelField != null) label = entry[protected.labelField];
                        if (label == null) label = entry.nome || entry.descricao;
                        if (id == null) id = entry.id;
                        public.add(label, id);
                    }
                });
            });
        }

        public.setSelectedItem = function(desc, id){
            public.setSelectedId(id);
        }
    

    }
    
    
}

combo;