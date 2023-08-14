

var text = {

    extends : UI.Input.Text,


    implementation: function(public, protected, private){
        public.use({  Border : { width : 1, color : "#cccccc"}, PaddingRight: 4, BackgroundColor : "transparent", Align: "right"})
        protected.afterExit = null;
        protected.value = "";
        protected.formHandler = null;
        protected.premeditateChanging = false;
        protected.modified = false;
        protected.noborder = false;
        protected.readonly = false;

        protected.returnListener = null;
        
        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null)
                protected.formHandler[protected.fieldName] = public;
            f.pushOrderList(public);
        }

        public.setModified = function(b){
            protected.modified = true;
        }

        public.setNoBorder = function(b){
            protected.noborder = b;
        }

        public.isModified = function(){
            return protected.modified;
        }

        public.setFieldName = function(name){
            protected.fieldName = name;
            if (protected.formHandler != null){
                 protected.formHandler[name] = public;
            }
        }

        public.getFieldName = function(){
            return protected.fieldName;
        }


        public.clearInput = function(){
            public.setValue("0,00");
        }


        public.getFieldValue = function(){
            return protected.value;
        }

        public.setFieldValue = function(value){
            var v= parseFloat(value);
            if (isNaN(v) == true || v < 0) v = 0;

            protected.value = v;
            
            public.oldSetText(Format.toMoneyString(v));
        }

        public.onValueChanged = function(l){
            protected.listener = l;
        }

        protected.element.onblur = function(l){
            protected.value = Format.floatFromString(protected.element.value);
            if (protected.value == null || isNaN(protected.value == true) || protected.value < 0)
                protected.value = 0;
            
            public.oldSetText(Format.toMoneyString(protected.value));
            if (protected.listener) protected.listener();
        }

       /* public.onExitFocus(function(){

            if (protected.afterExit != null)
                protected.afterExit(protected.element);
            if (public.getText() != protected.value){
                protected.modified = true;
                if (protected.formHandler !=null)
                    protected.formHandler.notifyChanged(public);
            }
          

        });*/

        public.onExitFocus = function(l){
            protected.listener = l;
           // if (protected.autocomplete != null) protected.autocomplete.hide();
        }

        public.onFocus(function(l){
            if (protected.readonly != false) return;
            if (protected.autocomplete != null){
                
                protected.autocomplete.show(public.getText());
            }
        });

        protected.selectNext= function(){
            if (protected.formHandler != null){
                if (protected.listener) {
                    var result = protected.listener();
                    if (result == false)
                       return;

                }
                protected.premeditateChanging = true;
                protected.formHandler.selectNextControl(public);
            }
        }

        public.onKeyUp(function(a,e){
            if (protected.readonly == true) return;
            if (protected.autocomplete == null){
                if (e.keyCode == 13){
                    protected.selectNext();
                }
                protected.modified = true;
  
                if (protected.formHandler != null && protected.formHandler.onChange != null)
                    protected.formHandler.onChange(public);

                if (protected.returnListener != null) protected.returnListener();
                return;
            }   

            if (e.keyCode == 27){
                protected.autocomplete.hide();
            } else if (e.keyCode == 13){
                protected.autocomplete.selectCurrent();
                protected.selectNext();
            } else if (e.keyCode == 40){
                protected.autocomplete.downArrow();
            } else if (e.keyCode == 38){
                protected.autocomplete.upArrow();
            } else if (e.keyCode == 8){
                protected.autocomplete.erase();
            }
            protected.modified = true;
            protected.autocomplete.refresh(public.getText());
        })

        public.onClick( function(){
            public.selectAll();
        });

        public.oldSetText = public.setText;
        public.setText=  function(txt){
            protected.value = txt;
            protected.realValue = txt;
            protected.modified = false;
            public.oldSetText(txt);
        }

        protected.oldSetReadOnly = public.setReadOnly;
        public.setReadOnly = function(b){
            protected.readonly = b;
            if (b == null) b = true;
            if (b == true){
                public.setCursor("normal");
                protected.oldSetReadOnly(true);
                protected.element.enabled = false;
              //  public.setBackgroundColor("transparent");
              //  public.setBorder({ width: 0, color: "transparent" });
            } else{
                public.setCursor("text");
                protected.oldSetReadOnly(false);
                protected.element.enabled = true;
               // public.setBackgroundColor("#ffffff");
               /* if (protected.noborder == false)
                    public.setBorder({width: 1, color : "#cccccc" });*/
            }
        }

        public.edit = function(){
            
        }

        public.cancelEdit = function(){
            protected.value = protected.realValue;
            if (protected.fieldType == "money"){
                if (protected.value != null)
                    public.oldSetText(Format.toMoneyString(protected.value));
                else public.oldSetText("");
            } else public.oldSetText(protected.value);
        }

        public.saveEdit = function(){
            protected.realValue = protected.value;
            protected.modified = false;
        }

        public.getValue = function(){
            return protected.value;
        }

        public.setFieldType  = function(tp){
            protected.fieldType = tp;
        }

        public.setLength = function(l){
            protected.element.maxLength = l;
            
        }
        
        public.onPressEnter(function(l){
            protected.returnListener = l;
        })

        public.setValue = function(v){
            v = parseFloat(v);
            if (isNaN(v) == true || v < 0) v = 0;
            protected.value = v;
            protected.realValue = v;
            protected.modified = false;
            public.oldSetText(Format.toMoneyString(v));

        }

        public.setNewValue = function(v){
            protected.modified = true;
            protected.value = v;
            if (protected.fieldType == "money")
            public.oldSetText(Format.toMoneyString(v));
        else
            public.oldSetText(v);
        }

        public.hint = function(h){
            if (protected.hint != null){
                Display.remove(protected.hint);
            }
            protected.hint = New(UI.Text, { Opacity: 0.8, Height: 30, Align : "center", FontSize: 12, Padding : {left: 8, right: 8}, BackgroundColor : "#454545", FontColor : "white", Text : h});

            var r = protected.element.getBoundingClientRect();

            protected.hint.setRelativeRect({ left: r.left, top: r.top - 35 });

            protected.hint.getDOMElement().style.borderColor = "#555 transparent transparent transparent";

            Display.add(protected.hint);

            window.setTimeout(function(){
                if (protected.hint != null){
                    Display.remove(protected.hint);
                    protected.hint = null;
                }
            }, 2000);
        }

        
        public.setAutocomplete = function(a){
            protected.autocomplete = a;
        }

        public.setStyle = function(style){
            style = style.toLowerCase();
            if (style == "uppercase"){
                protected.afterExit = upperCaseCheck;
            } else if (style == "capitalize"){
                protected.afterExit = capitalizeCheck;
            } else if (style == "title"){
                protected.afterExit = capitalizeCheck;
            }
        }


        function upperCaseCheck(el){
            el.value = el.value.toUpperCase(); 
        }


        function capitalizeCheck(el){
            var s = el.value;

            var words = s.split(" ");
            var newString = "";
            var first = true;
            var s;
            words.forEach(function(word){
                if (word != ""){
                    if (first == true) first = false;
                    else newString += " ";
                    
                    var w = word.toLowerCase();
                    if (word == "de" || word == "da" || word == "do" )
                        newString += w;
                    else {
                        s = word.charAt(0);
                        newString += s.toUpperCase();
                        newString += word.substring(1);
                    }
                }
            })

            el.value = newString;
        }


        public.isFocused = function(){
            if (document.activeElement == protected.element) return true;
            return false;
        }

    }

}

text;

