
var Check = {

    extends : UI.Text,

    implementation :function(public, protected, private){
        public.use({BackgroundColor:  "#ffffff", FontFamily: "Material Icons",Text : "",  FontSize : 14, FontWeight: "bold", Width: 14, Align : "center", Height: 14, Border : { width : 2, color: "#cccccc" } } );
        protected.checked = false;
        protected.enabled = true;

        protected.rBg = null;


        public.setValue = function(b){
            public.setChecked(b);
        }

        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null){
                protected.formHandler[protected.fieldName] = public;
                f.pushOrderList(public);
            }
        }

        public.setModified = function(b){
            protected.modified = true;
        }


        public.isModified = function(){
            return protected.modified;
        }

        public.setFieldName = function(name){
            protected.fieldName = name;
            if (protected.formHandler != null){
                 protected.formHandler[name] = public;
                 protected.formHandler.pushOrderList(public);
            }
        }

        public.getFieldName = function(){
            return protected.fieldName;
        }


        public.clearInput = function(){
            public.setDate(new Date());
        }


        public.getFieldValue = function(){
            return protected.checked;
        }

        public.setFieldValue = function(value){
            public.setChecked(value);
        }

        ///
        public.setChecked= function(b){
            protected.checked = b;
            if (b== true) {
                public.setText("\ue876");
                public.setBorder({ width : 2, color: "#303030" });
                if ( protected.onchange != null) protected.onchange(true);
            }
            else {
              //  protected.oldBgColor (protected.rBg);
                public.setText("");
                public.setBorder({ width : 2, color: "#cccccc" });
                if ( protected.onchange != null) protected.onchange(false);
            }
        }

        public.onMouseOver(function(){
            if (protected.enabled != true) return;
            public.setBorder({ width : 2, color: "#909090" });
        });

        public.onMouseOut(function(){
            if (protected.enabled != true) return;
            if(protected.checked == true){
                public.setBorder({ width : 2, color: "#303030" });
            } else{
                public.setBorder({ width : 2, color: "#cccccc" });
            }
        });

        public.onClick(function(){
            if (protected.enabled != true) return;
            protected.modified = true;
           public.setChecked(protected.checked == false);
           if (protected.listener != null)
            protected.listener.didCheckChange(protected.checked);
            if (public.didCheckChange != null) public.didCheckChange(protected.checked);
            if (protected.formHandler != null && protected.formHandler.onChange != null)
                protected.formHandler.onChange(public);
        });

        protected.oldBgColor = public.setBackgroundColor;

        public.setReadOnly = function(b){
           public.setEnabled(b == false);
        }
       /* public.setBackgroundColor = function(c){
            protected.rBg = c;
            protected.oldBgColor(c);
        }*/
        public.setListener = function(l){
            protected.listener = l;
        }

        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == true)
                public.setOpacity(1);
            else public.setOpacity(0.4);
        }

        public.getValue  = function(){
            return protected.checked;
        }
        public.onChange = function(l){
            protected.onchange = l;
        }

        public.isChecked = function(){
            return protected.checked;
        }

    }

}

Check;
