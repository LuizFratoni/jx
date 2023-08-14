

var API = new F2Gateway("");


var PastaSimples = {
    extends : UI.Container,
    
    implementation: function(public, protected, private){
        
        public.use({ Orientation: "vertical", MinHeight: 27, RelativeRect: { left: 0, right: 0}} );
        protected.collapsed = true;
 
        protected.header = New(UI.Container, { MarginLeft: 0, Height: 27, Orientation: "horizontal"} );
        protected.collapse = protected.header.add(New(UI.Text, { MarginLeft: 4, FontColor: "#f0f0f0", Width: 10, FontSize: 16, FontFamily: "Material Icons", Height: 27} ))
        protected.icon = protected.header.add(New(UI.Text, { Visible: false, TextShadow : {left: 1, top:1, size: 2, color : "#909090"},  FontFamily : "Material Icons", Height: 27,  Text : "\ue2c7", FontSize: 26, FontColor : "#FFcc90"} ));
        protected.nome = protected.header.add(New(UI.Text, {  Text : "..", FontSize: 11, FontColor : "white", MarginLeft: 6, Height: 27} ));
        protected.extra = protected.header.add(New(UI.Text, { Visible: false, Text : "", FontSize: 11, FontColor: "#4030c0", MarginLeft: 6}))
        
        public.add(protected.header);        
        
        public.setData = function(data){    
 

            protected.nome.setText(data.nome );

            protected.data = data;
            if (data.arquivos != null) public.setFolders(data.arquivos);
        }
        
        public.getData = function(){
            return protected.data;
        }

 
        protected.header.onMouseDown(function(){
            if (protected.selected == true) return;

        })
        
        protected.header.onMouseUp(function(o, e){
            if (protected.selected == true) return;


        })
        
        public.setListener = function(l){
            protected.listener = l;
        }
        
       /* protected.header.onDoubleClick(function(){
            protected.listener.realSelectFolder(public, protected.data);
        })*/

        protected.collapse.onClick(function(o,e){
            e.stopImmediatePropagation();
            if (protected.childs != null){
                if (protected.collapsed == true){
                     protected.childs.setVisible(true);
                     protected.collapsed =false;      
                     protected.collapse.setText("\ue5cf");          
                }
                else {
                    protected.childs.setVisible(false);
                    protected.collapsed = true;
                    protected.collapse.setText("\ue409");      
                }
            } 

           
        })
        protected.header.onClick(function(o, e){
            e.stopImmediatePropagation();
            protected.listener.selectFolder(public, protected.data);
        });

        public.isExpanded = function(){
            return protected.child == null || protected.collpased == false;
        }
        
        public.addFolder = function(obj){
            if (protected.childAttr != null) obj.use(protected.childAttr);
            if (protected.childs == null){
                 protected.childs  = public.add(New(UI.Container, {BorderLeft : { style : "dotted", color : "#e0ddcc", width: 1}, Visible: true, MarginLeft: 20, MinHeight: 10, Orientation: "vertical"} ));
                // protected.collapse.setText("\ue409")   
                protected.collapse.setText("\ue5cf"); 
                protected.collapsed = false; 
            }    
            protected.childs.add(obj);
            return obj;
        }
        
               
        public.setSelected = function(b){
            protected.selected = b;
            if (b == true){
                protected.header.setBackgroundColor("#3e3e3e");
            }else{
                protected.header.setBackgroundColor("transparent")
            }
        }


        public.setChildAttributes = function(attr){
            protected.childAttr = attr;
        }
        
        public.setMargin = function(m){

        }
        
        public.setTextAttributes = function(attr){
            protected.nome.use(attr);
        }
        
         public.setIconAttributes = function(attr){
            protected.icon.use(attr);
        }
        

        public.setChildAttributes = function(attr){
            protected.childAttr = attr;
        }
        
        public.setMargin = function(m){

        }
        
        public.setText = function(t){
            protected.nome.setText(t);
        }

        public.setIcon = function(i){
            protected.icon.setText(i);
        }

        public.setIconColor = function(c){
            protected.icon.setFontColor(c);
        }

        public.setTextAttributes = function(attr){
            protected.nome.use(attr);
        }
        
         public.setIconAttributes = function(attr){
            protected.icon.use(attr);
        }
        

         
         public.getId = function(){
             if (protected.data == null) return 0;
             return protected.data.id;
         }

         public.setTag = function(t){
            protected.tag =t ;
         }

         public.addSimpleFolder = function(u){
            if (u == null) u = {};
            u.Listener = protected.listener;
            u.Tag = protected.tag;
             public.add(New(PastaSimples, u))
         }

         public.setFolders = function(p, attr){
            p.forEach(function(pasta){

                var p = public.addFolder( New(PastaSimples, {Listener: protected.listener, Data: pasta,  Tag : protected.tag} ));
             //   folder.expand();

              /*  if (pasta.items!= null && pasta.items.length >0)
                    p.setFolders(pasta.items );
                */
                   
                } );
         }

         
         public.setLayout = function(l){

            protected.layout = l;
         }

         public.getLayout = function(){
            return protected.layout;
         }

         
        public.addFolders = function(data,  attr){
                
            var folder;

            data.arquivos.forEach(function(pasta){
                    
                    folder = public.addFolder(New(Pasta, { ParentFolder: parent, Data: pasta, Listener : public} ));
                    if (attr != null)
                        folder.use(attr);
                    if (pasta.arquivos!= null && pasta.arquivos.length >0)
                        folder.addFolders(pasta.arquivos);
                       
                       
            } );

        }



    }
    
};


var ErrorView = {

    extends : UI.Container,

    implementation: function(public){
        public.use({ Width: 300, MinHeight: 150, BorderRadius: 16, BackgroundColor: "#5e5e5e", Orientation: "vertical", Shadow: {left: 2, top: 2, size: 8, color: "#000000"} })
        public.add(New(UI.Text, { Width: 300, Height: 150, FontSize: 128, FontFamily: "Material Icons",  FontColor: "#f0f0f0", Text : "\ue002", Align: "center"}));

       var txt = public.add(New(UI.Text, { FontSize: 11, FontColor: "#ffc090", Width: 280, MarginLeft: 10, MarginTop: 10, MarginBottom: 10} ));

        public.setText = function(t){
            txt.setText(t);
        }
    }
}



var DevStudio = {

    extends: UI.Container,

    implementation: function(public, protected, private){
        public.use({ BackgroundColor: "#2e2e2e" });
        var toolbar = public.add(New(UI.Container, { Orientation: "horizontal", BackgroundColor: "#1e1e1e",Height: 29, RelativeRect: { left: 0, top: 0, right :0}, BorderBottom: { width: 1, color : "#909090"}}));
        var folders = public.add(New(UI.Container, {  Orientation: "vertical", RelativeRect : { left: 0, top: 30, bottom: 0}, Width: 300, BackgroundColor: "#1e1e1e"}));

        var icon = toolbar.add(New(UI.Text, { Width: 30, Align: "center", FontFamily: "Material Icons", Height: 28, FontSize: 24, Text : "\uea3b", FontColor: "#cccccc"}))
        toolbar.add(New(UI.Text, { FontSize: 12, FontWeight: "bold", Text : "Frison - UI Studio", FontColor: "#cccccc", Height: 28, FontSize: 14}))
        protected.curView = null;
        protected.errorView = New(ErrorView, {RelativeRect: { left: 320, top: 20}});

        API.get("/files", function(data, error){

            data.arquivos.forEach(function(p){

                folders.add(New(PastaSimples, {Listener: public, Data: p  }));
    
            })
    
        })
        

        public.run = function(){
            public.use({ PositionMode: "fixed", RelativeRect: { left: 0, top : 0, right: 0, bottom: 0}});
            Display.add(public);
            Class.setClassPath("lib/");
            Class.load("form/bundle");
            Class.setClassPath("classes/");
        }
        
        public.onShow = function(l){
            icon.onClick(function(){
                protected.closeListener();
            })
            protected.closeListener = l;
        }

        public.selectFolder = function(folder, data){

            if (folder == protected.curFolder) return;
            if (protected.curFolder != null){
                protected.curFolder.setSelected(false);
            }
            
            protected.curFolder = folder;

            if (protected.curFolder != null)
                protected.curFolder.setSelected(true);
            


            if (protected.curView != null){
                public.remove(protected.curView);
                protected.curView = null;
            }

            if (folder == null) return;
            var uri = folder.getData().caminho.replace(/\.js$/, '');
            
            if (uri != null){
                try{

                    var view = DEBUG_NEW(uri, { RelativeRect: { left: 320, top: 50, right: 20, bottom: 20}, Shadow : { left: 2, top:2, size: 8, color: "#000000"}});
                    protected.curView = view;
                    public.add(view);
                } catch(e){

                    console.error(e);
                    protected.errorView.setText(e);
                    public.add(protected.errorView);
                    protected.curView = protected.errorView;

                }
            }

        }

    }

};



function DEBUG_LOADINHERITANCE(uri, instance, protected){


        var cls;
        if (uri.constructor == String){
            console.log("Carregando Herança: "+uri);
            cls = Class.forName(uri);
            if (cls == null){
                throw "Base Class '"+uri+" not found";
            }
        } else {

            console.log("Classe de Herança já carregada");
            cls = uri;

        }
        
        if (cls.extends != null){
                DEBUG_LOADINHERITANCE(cls.extends, instance, protected);
        }
        
        console.log("Criando Instancia- Object Herança")
            cls.implementation(instance, protected, {});   

    }

function DEBUG_NEW(uri, attr){

        var instance = {};
        var protected = {};
        var aux;
        if (uri.constructor == String){
            console.log("Criando Instancia de "+uri);
            
            var cls = Class.forName(uri);
            if (cls == null){

                    throw console.error("Class '"+uri+"' not found");
            }

        }else 
            cls = uri;
        
         instance.class = uri;
         if (cls.extends != null){

            DEBUG_LOADINHERITANCE(cls.extends, instance, protected);
         }

         console.log("Criando Instância do Objeto")
        cls.implementation(instance, protected, {});
            

    
    if (attr != null)
        Class.applyProperties(instance, attr);
    return instance;
    
}

DevStudio;



