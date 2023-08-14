

var text = {

    extends : UI.Input.MultilineText,


    implementation: function(public, protected, private){
        public.use({FontFamily: "helvetica",  Border : {width: 1, color : "#cccccc" }, BorderRadius: 2, PaddingLeft: 4})

        protected.formHandler = null;
        protected.premeditateChanging = false;
        protected.modified = false;
        protected.fieldName = null;
        protected.element.style.resize = "none";

        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null)
                protected.formHandler[protected.fieldName] = public;
            f.pushOrderList(public);
        }

        public.isModified = function(){
            return protected.modified;
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

        public.oldSetText = public.setText;
        public.setText=  function(txt){
            protected.value = txt;
            protected.modified = false;
            public.oldSetText(txt);
        }

        public.clearInput = function(){
            public.setText("");
        }

        public.onKeyUp(function(a,e){
            if (protected.readonly == true) return;
                protected.modified = true;
  
                if (protected.formHandler != null && protected.formHandler.onChange != null)
                    protected.formHandler.onChange(public);


                return;

        })

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
            if (public.getText() != protected.value){
                protected.modified = true;
            }
            if (protected.listener) protected.listener();
        });

        public.onClick( function(){
            public.selectAll();
        });

        protected.oldSetReadOnly = public.setReadOnly;
        public.setReadOnly = function(b){
            if (b == null) b = true;
            if (b == true){
                protected.oldSetReadOnly(true);
                protected.element.enabled = false;
                public.setBackgroundColor("transparent");
                public.setBorder({ width: 1, color: "#cccccc" });
            } else{
                protected.oldSetReadOnly(false);
                protected.element.enabled = true;
                public.setBackgroundColor("#ffffff");
                public.setBorder({width: 1, color : "#cccccc" });
            }
        }

        public.cancelEdit = function(){
            public.setText(protected.value);
        }

        public.saveEdit = function(){
            protected.value = public.getText();
            protected.modified = false;
        }

        public.getValue = function(){
            return public.getText();
        }

        public.setValue = function(v){
            protected.value = v;
            protected.modified = false;
            public.oldSetText(v);
        }

        public.setNewValue = function(v){
            protected.modified = true;
            public.oldSetText(v);
        }

        
        
    }


}

text;
