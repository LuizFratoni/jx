

var Combo = {

    extends : Form.Text,

    implementation : function(public, protected, private){

        var autocomp = New(Form.Autocomplete, { Gateway: MX.comercial, Target : public, Field : "nome",  Listener : public});

        protected._modified = false;
        protected.field = "nome";

        public.setAutocomplete(autocomp);

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
                 protected.formHandler.pushOrderList(public);
            }
        }

        public.setGateway = function(g){
            autocomp.setGateway(g);
        }

        public.setUrl = function(url){
            autocomp.setUrl(url);
        }

        public.setField= function(f){
            protected.field = f;
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

            if (v != null){
                var n = v[protected.field];
                if (n == null) n = v.nome || v.descricao
                public.setText(n);
            }
            else public.setText("");
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

        protected.setData = function(data){
            protected._modified = true;
            protected.newValue = data;
            if (data != null){
                var n = data[protected.field];
                if (n == null) n = data.nome || data.descricao
                public.setText(n);
            }
            else public.setText("");

            protected._modified = true;
        }

        autocomp.setListener(protected);

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


    }

};

Combo;