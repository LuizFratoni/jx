

function myFormat(dt){
    var result = "";
   var aux = dt.getDate();
   
    if (aux <= 9)
       result = "0"+aux+"/";
   else result = aux+"/";
   
   aux = dt.getMonth()+1;
   if (aux <= 9)
       result += "0"+aux+"/";
   else result += aux+"/";
   
   result += dt.getFullYear();
   
   console.warn("Stringed  "+dt+" to "+result);
   return result;
   
}
var DateField = {
    
    
    extends : UI.Container,
    
    implementation: function(public, protected, private){
        public.use({ Height: 30, Width: 100, BorderRadius: 6, Orientation: "horizontal", BackgroundColor : "white", Border : { width: 1, color : "#cccccc"}  });
        
        protected.editor = public.add(New(UI.Input.Text, {BackgroundColor : "transparent", Width: 80, Height: 28, Align :"center", RelativeRect : { left: 0, top: 0, right: 20, bottom: 0},  Border : { width: 1, color : "transparent" } } ));
        protected.editor.getDOMElement().style.outline = "none";
        protected.date = new Date();
        
        protected.btn = public.add(New(UI.Text, { FontColor : "#909090", Float: "right", Height: 30, Width: 20, Align :"center", FontSize: 16, Text : "\ue61c", FontFamily : "autosig" } ));
        
                
        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null)
                protected.formHandler[protected.fieldName] = public;
            f.pushOrderList(public);
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
            }
        }

        public.getFieldName = function(){
            return protected.fieldName;
        }


        public.clearInput = function(){
            public.setDate(new Date());
        }


        public.getFieldValue = function(){
            return protected.date;
        }

        public.getValue = function(){
            return protected.date;
        }

        public.setFieldValue = function(value){
            public.setDate( new Date(value) );
        }

        public.onValueChanged = function(l){
            protected.listener = l;
        }


        protected.btn.onMouseOver(function(){
            protected.btn.setBackgroundColor("#f0f0f0");
            
        })
        
        protected.btn.onMouseOut(function(){
            if (protected.editing == true) return;
            protected.btn.setBackgroundColor("transparent");
        })
        
        
        protected.btn.onClick(function(){
            if (protected.readonly == true) return;
            protected.editing = true;
            protected.btn.setBackgroundColor("#909090");
            protected.btn.setFontColor("#ffffff");
            protected.dlg = New("form/smallDatePicker", { Border : { width: 1, color : "#9090cc" }, PositionMode : "fixed", BackgroundColor : "white",  Width: 210, Height: 210, Shadow : { left: 2, top: 2, size: 4, color : "rgba(0,0,0,0.6)" } } )
            
            if (protected.date !=null)
                protected.dlg.setDate(protected.date);
            else protected.dlg.setDate(new Date());
            
            var r = protected.element.getBoundingClientRect();
            protected.dlg.setLeft(r.left);
            if (protected.openToUp == true)
                protected.dlg.setTop(r.top-210);
            else protected.dlg.setTop(r.bottom);
            Display.add(protected.dlg);
            protected.dlg.setPositionMode("fixed");
            
            UI.onClickOutside(protected.dlg, function(){
                Display.remove(protected.dlg);
                protected.dlg = null;
                protected.btn.setBackgroundColor("transparent");
                protected.btn.setFontColor("#909090");
            })
            
            protected.dlg.setListener(function(data){
                UI.cancelClickOutside(protected.dlg);
                Display.remove(protected.dlg);
                protected.dlg = null;
                protected.btn.setBackgroundColor("transparent");
                protected.btn.setFontColor("#909090");
                protected.date = data;
                protected.editor.setText(Format.toSimpleDateString(data));
                protected.modified = true;

                if (protected.formHandler != null && protected.formHandler.onChange != null)
                    protected.formHandler.onChange(public);
                if (protected.onchange != null) protected.onchange();
            })
        });
        
        protected.setTextAttributes = function(attr){
            protected.editor.use(attr);
        }
        
        protected.oldSetHeight = public.setHeight;
        public.setHeight = function(h){
           protected.oldSetHeight(h);
           protected.editor.setHeight(h-2);
           protected.btn.setHeight(h);
        }
        
        public.setFocus = function(b){
            protected.editor.setFocus(protected.editor);
        }
        
        public.onPressEnter = function(callback){
            protected.pressEnterListener = callback;
           
        }
        
        protected.editor.onPressEnter(function(){
            if (protected.onchange != null) protected.onchange();
             protected.pressEnterListener();
        })
        
        public.setText = function(t){
            protected.editor.setText(t);
        }
        
        public.setDate = function(dt){
            protected.modified = false;
            if (dt == null){
                protected.date = null;
                protected.editor.setText("");
            } else {
                protected.date = dt;
                protected.editor.setText(myFormat(dt));
            }
        }
        
        public.getDate = function(){
            return protected.date;
        }
        
        protected.editor.onKeyDown(function(e){
            var pK = e ? e.which : window.event.keyCode;
            
            
        })
        
        protected.editor.onExitFocus(function(){
            
             var str = protected.editor.getText();
    //return Date.parse(str);

    var nodes = str.split("/");
    var y,m,d;
    y = parseInt(nodes[2]);
    var sm = nodes[1];
    if (sm.charAt(0) == '0') m = parseInt(sm.charAt(1));
    else m = parseInt(sm);
    
    var sd = nodes[0];
    if (sd.charAt(0) == '0') d = parseInt(sd.charAt(1));
    else d = parseInt(sd);

    m = m-1;

    var dt = new Date(y, m, d); 

            protected.date = dt;
            
            protected.editor.setFontColor("black");
            console.warn("Data "+protected.date);
            
            if (protected.onchange != null) protected.onchange();
            if (protected.onexit != null)
                protected.onexit();
    })
        
        
        public.onExitFocus= function(l){
            protected.onexit = l;
        }
        
        public.onChange = function(l){
            protected.onchange = l;
        }
        
        public.setValue = function(dt){
            protected.modified = false;
            if (dt == null){
                protected.date = null;
                protected.editor.setText("");
            } else {
                dt = new Date(dt);
                protected.date = dt;
                protected.editor.setText(myFormat(dt));
            }
        }

        public.setReadOnly = function(b){
            protected.readonly = b;
            protected.editor.setReadOnly(b);
            protected.btn.setVisible(b == false);
            if (b == true){
                protected.editor.setBackgroundColor("#f5f5f5");
                public.setBackgroundColor("#f5f5f5");
            } else{
                public.setBackgroundColor("#ffffff");
                 protected.editor.setBackgroundColor("#ffffff");
               // public.setBorder({width: 1, color : "#cccccc" });
            }
            
        }
        
        
        public.setOpenToUp = function(b){
            protected.openToUp  =b;
        }
        
        public.setDate(new Date());
    }
    
    
}

DateField;