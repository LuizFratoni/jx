

var PopupItem = {

    extends : UI.Container,

    implementation: function(public, protected, private){

        public.use({ Orientation: "horizontal", Height: 30, Width: 250 } );

        protected.icon = public.add(New(UI.Text, { FontSize: 18, FontFamily : "Material Icons", Width: 30, Height: 30, Align : "center", FontColor : "#303030", BackgroundColor : "#f0f0f0" }));

        protected.text = public.add(New(UI.Text, { PaddingLeft: 5,  FontSize: 12, Height: 30, FontColor : "#303030"}));

        public.setData = function(data){
            protected.method = data.Method || data.Action;
            protected.icon.setText(data.Icon);
            protected.text.setText(data.Text);
        }

        public.setListener = function(l){
            protected.listener = l;
        }

        public.onClick(function(){
            protected.listener.clicked(public, protected.method);
        });

        public.onMouseOver(function(){
            public.setBackgroundColor("#f0f0f0");
        });

        public.onMouseDown(function(){
            public.setBackgroundColor("#d0d0d0");
        });

        public.onMouseUp(function(){
            public.setBackgroundColor("#f0f0f0");
        })

        public.onMouseOut(function(){
            public.setBackgroundColor("transparent");
        })

    }

}

var Popup = {

    extends : UI.Container,

    implementation : function(public, protected, private){

        public.use({ PositionMode : "fixed", Orientation: "vertical", Width: 220, MinHeight: 30, BackgroundColor : "White", Border : {width: 1, color : "#cccccc"}, Shadow : { left: 2, top: 2, size: 6, color : "rgba(0,0,0,0.4)" }});

        protected.baseAlign = 0;

        public.Items = {};
        public.setItems = function(menu){

            public.clear();

            if (menu == null) return;
            menu.forEach(function(item){
                if (item.Separator == null || item.Separator != true){
                    var p = public.add(New(PopupItem, { Data: item, Listener : protected} ));
                    p.Method = item.Method;
                    if (item.Name != null){
                        public.Items[item.Name] = p;
                    }
                } else {
                    public.add(New(UI.View, { Width: 250, BorderTop: { width: 1, color : "#cccccc", style : "solid" }}));
                }
            });
        }

        public.setAlign = function(txt){
            if (txt == "right") protected.baseAlign = 1;
            else protected.baseAlign = 0;
        }

        public.setTarget = function(t){
            protected.target = t;
        }

        protected.clicked = function(item, method){
            protected.target[method](item);
            Display.remove(protected.overlay);
            Display.remove(public);
            
            if (protected.selectable != null){
                protected.selectable.setSelected(false);
                protected.selectable = null;
            }
        }

        public.show = function(r){

            
            protected.overlay = New(UI.View, { PositionMode : "fixed", RelativeRect: { left: 0, top: 0, right: 0, bottom: 0 }} );

            Display.add(protected.overlay);


            var rect = r.getDOMElement().getBoundingClientRect();

            if (protected.baseAlign == 0)
                public.setRelativeRect({ left: rect.left+5, top: rect.bottom });
            else {

                public.setRelativeRect({ left: rect.right-230, top: rect.bottom });

            }
            Display.add(public);


            protected.overlay.onClick(function(){
                Display.remove(protected.overlay);
                Display.remove(public);

                if (protected.selectable != null){
                    protected.selectable.setSelected(false);
                }
                protected.selectable = null;
            });

            if (protected.selectable != null){
                protected.selectable.setSelected(true);
            }
        }

        public.showInSelectable = function(r){
            protected.selectable = r;
            r.setSelected(true);
            public.show(r);
        }




    }

};

Popup;

