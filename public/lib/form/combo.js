

var Combo = {

    extends : UI.Container,

    implementation : function(public, protected, private){
        public.use({  Border : { width : 1, color : "#cccccc"},  PaddingLeft: 4, BackgroundColor : "transparent", Orientation : "horizontal"});
        protected.text = public.add(New(UI.Text, {FontSize: 12}));
        protected.decorator = public.add(New(UI.Text, { Float :"right", FontSize: 12, FontFamily: "Material Icons", Text : "\ue313"}));
        protected.currentItem = null;
        protected.modified = false;
        protected.readOnly = false;

        public.setFormHandler = function(f){
            protected.formHandler = f;
            if (protected.fieldName != null)
                protected.formHandler[protected.fieldName] = public;
            f.pushOrderList(public);
        }

        public.setPlaceHolder= function(n){
            protected.placeHolder= n;
            protected.text.setFontColor("#cccccc");
            protected.text.setText(n);
        }

        public.setFieldName = function(name){
 
            protected.fieldName = name;
            if (protected.formHandler != null){
                 protected.formHandler[name] = public;
            }
            
        }

        public.setFontColor = function(c){
            protected.text.setFontColor()
        };

        public.setFontSize = function(c){
            protected.text.setFontSize(c);
        }

        public.setFontFamily = function(c){
            protected.text.setFontFamily(c);
        }

        protected.oldHeight = public.setHeight;
        public.setHeight = function(h){

            //public.oldHeight(h);
            protected.element.style.height = h+"px";
            protected.text.setHeight(h);
            protected.decorator.setHeight(h);
        }

        public.onMouseOver(function(){
            if (protected.readOnly == true) return;
            protected.element.style.borderColor = '#e0e0e0';
            protected.decorator.setFontColor("#cccccc");
        });

        public.onMouseOut(function(){
            protected.element.style.borderColor = "#cccccc";
            protected.decorator.setFontColor("#000000");
        })

        public.setItems = function(items){
            protected.items = items;
         //  if (protected.items != null) protected.items.clearItems();
        }

        public.onClick(function(){
            console.log("OK - CLiquei");
            protected.overlay = New(UI.View, { PositionMode : "fixed", RelativeRect : { left: 0, top: 0, right: 0, bottom: 0 } } );
            if (protected.list == null){
                protected.list = New(Form.List, { Shadow : { left: 2, top: 2, size: 4, color : "#909090"}} );
            }

            protected.list.show({ target: public, items: protected.items} , function(obj){
                 var item;
                 if (obj != null) { item = {}; item.id = obj.getId(); item.text = obj.getText(); }
                 protected.currentItem = item;
                 if (item != null){
                    protected.text.setFontColor("#000000");
                    protected.text.setText(item.text);
                    if (protected.onChangeListener != null) protected.onChangeListener();
                }
                 protected.modified = true;
            });
        })

        public.onChange = function(l){
            protected.onChangeListener = l;
        }


        public.setNoBorder = function(b){
            protected.noborder = b;
        }

        public.isModified = function(){
            return protected.modified;
        }


        public.setDefaultItem = function(i){
            if (i.constructor == Object)
                protected.defValue = i;
            else protected.defValue = protected.items[i];
        }
        
        public.setReadOnly = function(b){
            protected.readOnly = b;
            if (b == true){
                protected.decorator.setVisible(false);
            } else {
                protected.decorator.setVisible(true);
            }
        }

        public.getFieldName = function(){
            return protected.fieldName;
        }


        public.clearInput = function(){
            if (protected.placeHolder != null) {
                protected.text.setFontColor("#cccccc");
                protected.text.setText(protected.placeHolder);
            } else {
                protected.text.setText("");
                protected.text.setFontColor("#000000");
            }
            
            protected.currentItem = null;
            protected.realValue = null;
            protected.modified = false;
 
        }


        public.getFieldValue = function(){
            if (protected.currentItem == null) return null;
            return protected.currentItem.id;
        }

        public.onValueChanged = function(l){
            protected.listener = l;
        }

        public.getValue = function(){
            if (protected.currentItem == null){
                if (protected.defValue != null){
                    return protected.defValue.id;
                } else return null;
            }
            return protected.currentItem.id;
        }

        public.setValue = function(v){
            if (v == null){
                v = protected.defValue;
            }else
            if (v.constructor == Object){
                protected.currentItem = v;
                protected.text.setText(v.nome || v.descricao);
                protected.realValue = v;
                protected.modified = false;
                return;
            } else {
                if (protected.items != null){

                    var result;
                    protected.items.forEach(function(i){
                        if (i.id == v){ 
                            result = i;
                            return false;
                        }
                    });
 
                }

                if (result == null){
                    v = protected.defValue;
                } else v = result;

            }

            protected.currentItem  = v;
            protected.realValue = v;
            protected.modified = false;
            if (v != null)
                protected.text.setText(v.text)
            else {
                if (protected.placeHolder != null) {
                    protected.text.setFontColor("#cccccc");
                    protected.text.setText(protected.placeHolder);
                } else {
                    protected.text.setText("");
                    protected.text.setFontColor("#000000");
                }
                
            }
        }


        public.cancelEdit = function(){
            protected.currentItem = protected.realValue;
            protected.modified = true;
            protected.setText(protected.currentItem.text);
        }

        public.saveEdit = function(){
            protected.realValue = protected.currentItem;
            protected.modified = false;
        }

        public.setTarget = function(t){
            MX.siom.get(t, function(data){
                protected.items = data;
            }); 
        }

        public.setData  = public.setValue;
    }

};

Combo;

