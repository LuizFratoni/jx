

var Mensagem = {

    extends : UI.Text,

    implementation: function(public, protected){
        public.use({ Text : "Componente Mensagem", Height: 30, Align: "center", Padding: 10, BackgroundColor: "blue", FontColor: "white"});
    }
}

//Ultima Linha repetir nome da Classe Principal Compartilhada
Mensagem;