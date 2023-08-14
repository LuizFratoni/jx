var overlay;
var curDlg;


var Item = {

    extends : UI.Text,

    implementation: function(public, protected, private){

        public.use({ Height: 24, FontSize: 12, PaddingLeft: 5, BorderBottom: {width: 1, color : "#f0f0f0"} });

        protected.element.style.maxHeight = 24;
        protected.element.style.overflowX = "hidden";
        
        public.onMouseOver(function(){
            public.setBackgroundColor("#f0f0f0");
        });

        public.onMouseOut(function(){
            public.setBackgroundColor("transparent");
        });

        public.onMouseDown(function(){
            public.setBackgroundColor("#e0e0e0");
        })

        public.onMouseUp(function(){
            public.setBackgroundColor("#f0f0f0");
        })

        public.onClick(function(){
            protected.listener.selectItem(public);
        })

        public.setListener = function(l){
            protected.listener = l;
        }

        public.setId = function(id){
            public.id = id;
        }

        public.getId = function(){
            return public.id;
        }

        public.setid = function(id){
            public.id = id;
        }

        public.settext = function(text){
            public.setText(text);
        }

        public.setnome = function(text){
            public.setText(text);
        }

        public.setdescricao = function(text){
            public.setText(text);
        }
    }

};

var List = { 

    extends : UI.Container,

    implementation: function(public, protected, private){

        protected.bindName = "text";

        public.use({ Width: 200, Height: 300, BackgroundColor : "white", Border : { width: 1, color : "#cccccc"}});

        public.enableVerticalScroll(true);

        protected.items = public.add(New(UI.Container, { Orientation: "vertical", RelativeRect : {left: 0, top: 0, right: 0 }}));

        public.setItems = function(items){
            protected.items.clear();
            var x = 0;
            items.forEach(function(i){
                console.warn("ADicionando Item "+i);
                i.Width = 180;
                x++;
                i.Listener = public;
                protected.items.add(New(Item, i))
            })

            protected.autoh = x*25;
        }

        public.selectItem = function(item){
            console.log("SELECIONANDO ITEM");
            protected.listener(item);
        }

        public.setListener = function(l){

            protected.listener = l;
        }

        public.smartSize = function(){
            if (protected.autoh < 300) public.setHeight(protected.autoh);
        }

        public.show = function(attrs,  onsuccess, onfail){
            overlay = New(UI.Container, { PositionMode : "fixed", RelativeRect : { left: 0, top: 0, right: 0, bottom: 0 }});
            
            var r = attrs.target.getDOMElement().getBoundingClientRect();
            if (attrs.width == null) public.setWidth(r.right-r.left);
    
            Display.add(overlay);
    
            if (attrs.items != null) public.setItems(attrs.items);

            public.use({
                Shadow : { left: 2, top: 2, size: 8, color : "rgba(0,0,0,0.6)"}, RelativeRect : { left: r.left, top: r.bottom},  Listener : function(data){

                    Display.remove(overlay);
                    Display.remove(public);
                    if (onsuccess != null) onsuccess(data);
                } });

            public.smartSize();
    
            Display.add(public);
    
            overlay.onClick(function(){
               Display.remove(overlay);
               Display.remove(public);
               
    
               if (onfail != null) onfail();
            })
    
            return public;            
        }

    },


    show : function(item, items, onsuccess, onfail){
        overlay = New(UI.Container, { PositionMode : "fixed", RelativeRect : { left: 0, top: 0, right: 0, bottom: 0 }});

        var r = item.getDOMElement().getBoundingClientRect();

        Display.add(overlay);


        curDlg = New(List, { Shadow : { left: 2, top: 2, size: 8, color : "rgba(0,0,0,0.6)"}, Items : items, RelativeRect : { left: r.left, top: r.bottom}, Date: new Date(), Listener : function(data){
            Display.remove(overlay);
            Display.remove(public);
            if (onsuccess != null) onsuccess(data);
        } });

        curDlg.smartSize();

        Display.add(curDlg);

        overlay.onClick(function(){
           Display.remove(overlay);
           Display.remove(curDlg);
           

           if (onfail != null) onfail();
        })

        return curDlg;
        
    }

};

List;


