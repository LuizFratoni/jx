

var Combo = {

    extends : Form.Text,

    implementation : function(public, protected, private){

        var autocomp = New(Form.Autocomplete, { Gateway: MX.siom, Target : public, Field : "nome",  Listener : public});

        protected._modified = false;
        protected.fixedItem = null;
        protected.emptyText = "";
        protected.empty = true;

        public.setAutocomplete(autocomp);

        public.setEmptyText = function(t){
            protected.emptyText = t;
            if (protected.newValue == null) public.setText(t);
        }

        public.addFixedItem = function(i){
            if (protected.fixedItem == null) protected.fixedItem = [];
            protected.fixedItem.push(i);
            autocomp.setFixedItems( protected.fixedItem);
        }

        public.setFixedItems = function(i){
            protected.fixedItem = i;
            autocomp.setFixedItems( protected.fixedItem );
        }

        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null){
                protected.formHandler[protected.fieldName] = public;
                f.pushOrderList(public);
            }

        }

        public.setFieldName = function(name){
            protected.fieldName = name;
            if (protected.formHandler != null){
                 protected.formHandler[name] = public;
            }
        }


        public.setGateway = function(g){
            autocomp.setGateway(g);
        }

        public.setUrl = function(url){
            autocomp.setUrl(url);
        }

        public.setField= function(f){
            autocomp.setField(f);
        }

        public.clearInput = function(){
            public.setValue(null);
        }

        public.isModified = function(){
            return protected._modified;
        }

        public.setValue = function(v){
            protected.value = v;
            protected.newValue = v;
            protected._modified = false;
            if (v != null)
                public.setText(v.nome || v.descricao);
            else {
                if (protected.emptyText != null) public.setText(protected.emptyText)
                else public.setText("");
            }
        }

        public.getValue = function(){
            if (protected.newValue == null) return null;
            return protected.newValue.id;
        }

        public.cancelEdit = function(){
            protected.newValue = protected.value;
            protected._modified = false;
            if (protected.value != null){
                public.setText(v.nome || v.descricao);
            }
            else {
                public.setText("");
            }
        }

        public.saveEdit = function(){
            protected._modified = false;
            protected.value = protected.newValue;
        }

        /*public.setNewValue = function(v){
            protected.modified = true;
            protected.value = v;
        }*/

        protected.setData = function(data){
     
            protected._modified = true;
            protected.newValue = data;

            if (data != null){
                public.setText(data.nome || data.descricao);
                if (data.id == null){
                    protected.newValue = null;
                    protected.empty = true;
                } else
                protected.empty = false;
            }
            else {
                public.setText("");
                protected.empty = true;
            }

            protected._modified = true;

            if (protected.changeListener != null) 
                protected.changeListener();
        }

        public.onChange = function(l){
            protected.changeListener = l;
        }

        public.onExitFocus(function(){
            if (protected.newValue != null){
                protected.empty = false;
                public.setText(protected.newValue.nome || protected.newValue.descricao);
            }
            else {
                protected.empty = true;
                public.setText(protected.emptyText);
            }
        });

        public.onFocus(function(l){
            if (protected.readonly != false) return;
            if (protected.autocomplete != null){
                if (protected.empty == true) public.setText("");                
                protected.autocomplete.show(public.getText());
            }
        });

      //  autocomp.setListener(protected);

    }

};

Combo;