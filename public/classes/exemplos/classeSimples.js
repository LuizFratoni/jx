var ClasseSimples = {

    extends : UI.Container, // ou "caminho/do/componente"

    implementation: function(public, protected){
        public.use({ BackgroundColor: "white", Width: 300, Height: 300})
    }

};

ClasseSimples;