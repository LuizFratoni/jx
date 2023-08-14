

var bgColor = New(UI.Brushes.LinearGradient);
bgColor.vertical("#ffffff", "#dde0ef");

var BlockView = {
    
    extends : UI.Text,
    
    implementation: function(public, protected, private){

        public.use({Height: 20, FontSize: 11, Align : "center", InnerShadow : {left: 1, top: 1, size: 3, color : "#909090"} ,  FontColor : "#454545", Border : {width: 1, color : "#adadada"}, Width: 120, BackgroundColor : "#dddddd", BorderRadius: 8}  );
    }
    
}


var tabBg = New(UI.Brushes.LinearGradient);
tabBg.vertical("#f5f5f5", "#dde0ef");

var tabColor = New(UI.Brushes.LinearGradient);
tabColor.vertical("#f5f5f5", "#fbfdff");

var tabOffColor = New(UI.Brushes.LinearGradient);
tabOffColor.vertical("#f5f5f5", "#e5ebf2");


var BlueTheme = {
    background : tabBg,
    tab : tabColor,
};

var oBg = New(UI.Brushes.LinearGradient);
oBg.vertical("#f5f5f5", "#f8e0cc");

var oTabBg = New(UI.Brushes.LinearGradient);
oTabBg.vertical("#f5f5f5", "#e0e0cc");


var OcherTheme = {
    background : oBg,
    tab : oTabBg
}

var Themes = {
    blue : BlueTheme,
    ocher : OcherTheme
}

var Tab = {

    extends : UI.Text,

    implementation : function(public, protected, private){
        public.use({ MarginLeft: 5, MarginTop: 5, BorderTopRadius: 6,  Height: 28, Width :100, BackgroundColor : "white", BackgroundBrush : tabColor, Opacity: 0.6, Align: "center", FontSize: 12, FontColor :"#909090", BorderRight: { width: 1, color : "#cccccc"}, BorderLeft : { width: 1, color : "#cccccc"} , BorderTop: { width: 1, color :  "#cccccc"}   } );
        protected.prefw = null;


        public.setSelected = function(b){
            protected.selected = b;

            if (b == false){
                public.setOpacity(0.6);
                public.setShadow(null);
                public.setHeight(28);
            }
            else{
                public.setOpacity(1);
                public.setBackgroundBrush(tabColor);
                public.setShadow({left:0,top:0, size: 3, color : "rgba(0,0,0,0.4)"} );
                public.setHeight(30);
            }
        }


        public.onMouseOver(function(){
            if (protected.selected == true) return;
            public.setOpacity(0.8);
        })

        public.onMouseOut(function(){
            if (protected.selected == true) return;
            public.setOpacity(0.6);
        })

        public.setPage = function(pg){
            protected.pg = pg;
        }

        public.getView = function(){
            if (protected.pg == null) return null;
             if (protected.pg.view == null){

             }
             return protected.pg.view;
        }

        public.getPage = function(){
            return protected.pg;
        }

        public.setManager = function(m){
            protected.manager = m;
        }

        public.onClick(function(){
            protected.manager.didClickedOnTab(public);
        });

        public.setPrefWidth = function(w){
            protected.prefw = w;
        }

        public.getPrefWidth = function(){
              return protected.prefw;
        }

        public.setTheme = function(th){
            if (th != null){
                public.setBackgroundBrush(th.tab);
            }
        }

    }

}




var Tabs = {
    extends : UI.Container,

    implementation: function(public, protected, private){
        public.use({ Orientation: "horizontal", Height: 35, BackgroundBrush : bgColor });
        protected.curView = null;
        protected.curTab = null;
        protected.theme = null;
        public.didClickedOnTab = function(tab){
            public.selectTab(tab);
        }
        
        public.setTabs = function(tabs){
            
            protected.curTab = null;
            protected.firstTab = null;
            public.clear();
            tabs.forEach(function(tab){
                if (tab.view != null){
                    public.add(tab.view);
                } else
                    public.addTab(tab, {} );
            })
        }

        protected.firstTab = null;
        public.addTab = function(attr){
            var nattr = attr || {};
            nattr.Manager = public;
            nattr.Theme = protected.theme;
            var tab = New(Tab, nattr);
            attr.ctrl = tab;
            public.add(tab);
            if (protected.firstTab == null){
                protected.firstTab = tab;
            }
            return tab;
        }

        public.selectFirst = function(){
            public.selectTab(protected.firstTab);
        }



        public.selectTab = function(tab){
            if (protected.curTab != null){
                protected.curTab.setSelected(false);
             }
    
             protected.curTab = tab;
             tab.setSelected(true);


            var view;

            var pg = tab.getPage();
            
            if (pg == null) {
                if (protected.listener != null)
                         protected.listener.selectTab(tab);

                return;
            } 
            var view = pg.view;

            if (view == null && pg.uri != null){
                
                console.warn("CRIANDO VIEW "+pg.uri);
                var params = pg.params || {};
                pg.view = New(pg.uri, params);
                if (pg.onCreate != null)
                    pg.onCreate(pg.view);
                view = pg.view;
            } else {
                console.warn("VIEW Já EXISTE");
            }



            
            if (view != null && protected.viewHost != null){
                if (protected.curView != null){
                    console.warn("Removendo VIEW ANTERIOR")

                    if (protected.viewHost != null)
                    protected.viewHost.remove(protected.curView);
                }
                
                protected.curView = view;
                
                protected.curView.setRelativeRect({left: 0, top: 0, right: 0, bottom: 0 });
                
                if (protected.viewHost != null){
                    console.warn("Exibindo VIEW")

                    protected.viewHost.add(protected.curView);
                    if (protected.curView.onShow != null){
                        protected.curView.onShow();
                    }
                }

                
             }
                            
 
            if (protected.listener != null){
               try{
                    protected.listener.selectTab(tab, protected.curView);
               } catch(ex){
                  
               }
            }
        // protected.layout.requestWidth(tab.getPrefWidth());
        }
        
        public.didClickedOnTab = function(tab){
                public.selectTab(tab);
        }

        public.setViewHost = function(host){
            protected.viewHost = host;
        }

        public.setListener = function(lis){
            protected.listener = lis;
        }

        public.setTheme = function(th){

            if (typeof th === "string"){
                protected.theme = Themes[th];
            }
            else{    
                protected.theme = th;

            }

            if (protected.theme == null){
                protected.theme = BlueTheme;
            }

            public.setBackgroundBrush(protected.theme.background);
        
        }
        
    }

}

Tabs;

