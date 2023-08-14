
var AutocompleteItem = {

    extends : UI.Text,

    implementation : function(public, protected, private){
        public.use({Height: 20, FontSize: 12, Padding: { left :2, top: 2 } } );

        protected.element.style.overflowY = "hidden";
        public.setData = function(data){
            protected.data = data;
            var n = data.nome;
            protected.text = n;
            public.setText(n);
        }


        public.setListener = function(l){
            protected.listener = l;
        }

        public.onMouseOver(function(){
            protected.listener.markItem(public);
        });

        public.setMarked = function(b){
            protected.marked = b;
            if (b == true){
                public.setBackgroundColor("#cccccc");
            } else {
                public.setBackgroundColor("transparent");
            }
        }

        public.onClick(function(){
            protected.listener.selectItem(public, protected.data);
        })
    }

};


var Autocomplete = {

    extends : UI.Container,

    implementation: function(public, protected, private){

        public.use({ PositionMode : "fixed", Shadow : { left: 2, top: 2, size: 6, color : "rgba(0,0,0,0.5)"}, Height: 250, MinWidth: 100, BackgroundColor : "white", Border : { width: 1, color : "#cccccc"}});

        public.enableVerticalScroll(true);
        protected.content = public.add(New(UI.Container, { Orientation: "vertical", RelativeRect: { left: 0, top: 0, right: 0 } }));
        protected.curItem = null;
        protected.showed= false;
        protected.field = "nome";

        public.setGateway = function(api){
            protected.api = api;
        }

        public.setTarget = function(target){
            protected.target = target;
        }

        public.setUrl = function(url){
            protected.url = url;
        }        

        public.setField = function(field){
            protected.field = field;
        }


        public.downArrow = function(){
            if (protected.curItem.next != null)
                protected.markItem(protected.curItem.next);
        }

        public.upArrow = function(){
            if (protected.curItem.previous != null)
                protected.markItem(protected.curItem.previous);
        }

        public.erase = function(){
           protected.newValue = null;
           protected.modified = true;
           protected.listener.setData(null);
        }

        public.show = function(text){
            if (protected.showed == true) return;

            protected.showed = true;
            protected.overlay = Display.add( New(UI.View, { PositionMode : "fixed", RelativeRect : { left: 0, top: 0, right: 0, bottom: 0 } }) );

            var r = protected.target.getDOMElement().getBoundingClientRect();


            public.use({ BackgroundColor : "white", RelativeRect : { left: r.left, top: r.bottom }, Width: r.right-r.left});

            Display.add(public);
            public.refresh(text);

            protected.overlay.onClick(function(){
                public.hide();
            })
        }

        public.hide = function(){

            if (protected.showed != true) return;
            Display.remove(protected.overlay);
            Display.remove(public);
            protected.overlay = null;
            protected.showed = false;
        }

        public.refresh = function(txt){
            var url = protected.url+"?"+protected.field+"="+txt;

            var r = protected.target.getDOMElement().getBoundingClientRect();


            public.use({ RelativeRect : { left: r.left, top: r.bottom } });

            protected.api.get(url, function(data){
                protected.content.clear();
                var first = true;
                var prev = null;
                var cur;
                if (protected.fixedItems != null){
                    protected.fixedItems.forEach(function(i){
                        cur = protected.content.add( New(AutocompleteItem, { FontWeight: "bold", Data: { id: i.id, nome: i.nome },  Listener : protected } ));
                        if (first == true) {
                            cur.setMarked(true);
                            protected.curItem = cur;
                            first = false;
                        }
                        if (prev != null){
                            cur.previous = prev;
                            prev.next = cur;
                        }
                        prev = cur;
                    });
                }
                if (data == null){
                   // public.hide();
                    return;
                }
                public.show();


                data.forEach(function(item){
                    cur = protected.content.add( New(AutocompleteItem, { Data: { id: item.id, nome: item[protected.field] },  Listener : protected } ));
                    if (first == true) {
                        cur.setMarked(true);
                        protected.curItem = cur;
                        first = false;
                    }
                    if (prev != null){
                        cur.previous = prev;
                        prev.next = cur;
                    }
                    prev = cur;
                });

            });
        }


        protected.markItem = function(item){
            if (protected.curItem != null) 
                protected.curItem.setMarked(false);

            protected.curItem = item;
            item.setMarked(true);
        }

        protected.selectItem = function(item, data){
            public.hide();

            if (protected.listener.setNewValue != null)
                protected.listener.setNewValue(data);
            else protected.listener.setData(data);
        }

        public.setListener = function(l){
            protected.listener = l;
        }

        public.selectCurrent = function(){
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

        public.setFixedItems = function(i){
            protected.fixedItems = i;
        }
        
    }


};

Autocomplete;

