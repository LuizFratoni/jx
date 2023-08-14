var Formulario = {

    extends : UI.Container,

    implementation: function(public, protected){
        public.use({ BackgroundColor: "white", Orientation: "vertical"});
        public.add( New(UI.Text, {Text : "Digite seu nome:", Margin: { left: 20, top: 5}  }))
        public.add( New(Form.Text, { Width: 500, Height: 30, FontSize: 14} ))

        public.add(New("exemplos/mensagem"));

        protected.btn = public.add (New (UI.Text, { Text : "Clique em MIm", Padding: 10, BackgroundColor: "red"}));

        protected.btn.onMouseOver(function(){
            protected.btn.setBackgroundColor("blue")
        })

        protected.btn.onMouseOut(function(){
            protected.btn.setBackgroundColor("red");
        })

        protected.btn.onClick(function(){
            public.add (New("exemplos/mensagem"));
        })
    }

};

Formulario;