

var WhiteTheme = {
    normal : {
        background : "transparent", fontcolor : "#ffffff" 
    },
    mouseOver : {
        background : "rgba(0,0,0,0.1)", fontcolor : "black"
    },
    mouseDown : { 
        background : "rgba(0,0,0,0.15)", fontcolor : "#cccccc"
    }

}

var InvertTheme = {
    normal : {
        background : "#000000", fontcolor : "#ffffff" 
    },
    mouseOver : {
        background : "rgba(0,0,0,0.8)", fontcolor : "ffffff"
    },
    mouseDown : { 
        background : "rgba(0,0,0,0.6)", fontcolor : "#ffffff"
    }

}

var Themes = {
    white : WhiteTheme,
    invert : InvertTheme
}


var ToolButton = {

    extends : UI.Text,

    version: "1.0",

    implementation : function(public, protected, private){

        public.use({ FontFamily : "Material Icons", Align :"center", FontSize: 20, Width: 40, Height: 20, FontColor : "white" });
        
        //protected.popup = New("form/popup");
        protected.theme = WhiteTheme;

        public.onMouseOver(function(){
            if (protected.selected == true) return;
            public.setBackgroundColor(protected.theme.mouseOver.background);
            public.setFontColor(protected.theme.mouseOver.fontcolor);
        });

        public.onMouseOut(function(){
            if (protected.selected == true) return;
            public.setBackgroundColor(protected.theme.normal.background);
            public.setFontColor(protected.theme.normal.fontcolor);
        });

        public.onMouseDown(function(){
            if (protected.selected == true) return;
            public.setBackgroundColor(protected.theme.mouseDown.background);
            public.setFontColor(protected.theme.mouseDown.fontcolor);
        })

        public.onMouseUp(function(){
            if (protected.selected == true) return;
            public.setBackgroundColor(protected.theme.mouseOver.background);
            public.setFontColor(protected.theme.mouseOver.fontcolor);
        });

        public.setPopupAlign = function(al){

            protected.baseAlign = al;
        }

        public.setItems = function(items){
            if (items == null){
                protected.popup = null;
                return;
            }
            protected.popup = New("form/popup", { Align: protected.baseAlign });
            protected.popup.setItems(items);
        };

        public.setPopup = function(pop){
            protected.popup = pop;
        }

        public.onClick(function(e, i){
            protected.popup.setTarget(protected.target);
            protected.popup.showInSelectable(public);
            i.stopImmediatePropagation();
        });

        public.setSelected = function(b){
            protected.selected = b;

            if (b == true){
                public.setBackgroundColor(protected.theme.mouseDown.background);
                public.setFontColor(protected.theme.mouseDown.fontcolor);
            } else {
                public.setBackgroundColor(protected.theme.normal.background);
                public.setFontColor(protected.theme.normal.fontcolor);
            }   

            if (protected.selectable != null){
                protected.selectable.setSelected(b);
            }
        }

        public.setTarget = function(t){
            protected.target = t;
        }

        public.setTheme = function(t){
           // alert(typeof t);
            if ( typeof t == "string") {
                protected.theme = Themes[t];
            } else protected.theme = t;

            if (protected.theme == null) 
                protected.theme = WhiteTheme;

                //alert("SETANDO TEMA "+protected.theme);
            public.setBackgroundColor(protected.theme.normal.background);
            public.setFontColor(protected.theme.normal.fontcolor);    


        }

        public.setSelectable = function(l){
            protected.selectable = l;
        }

    }

};

ToolButton;

