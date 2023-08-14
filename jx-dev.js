
console.log("Frison UI-SERVER: "+__dirname)

var express = require('express'),
app = express(),
port = 8000//process.env.PORT || 8000;



const fs = require('fs');
const path = require('path');


app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use( function(req, res, next) {

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', '*');
        return res.sendStatus(200);
      } else {
        return next();
      }
    
});


app.get("/", function(req, res){
    var widgetName = req.query["class"];
    res.render("main", { } );
});

/// LISTA TODOS OS ARQUIVOS EM DESENVOLVIMENTO
function listarArquivosEDiretorios(pasta, root) {
    console.log("- Listando Pasta: "+pasta);
    var conteudo = fs.readdirSync(pasta);
      
    conteudo.forEach(item => {
        console.log("Arquivo: "+item);
        var fileInfo = { nome : item, caminho : root.caminho+"/"+item }
            const caminhoItem = path.join(pasta, item);
            root.arquivos.push(fileInfo);
        
        var stats = fs.statSync(caminhoItem);

        if (stats.isFile()) {
            fileInfo.tipo = "arquivo";
        } else if (stats.isDirectory()) {
            fileInfo.tipo = "pasta";
            fileInfo.arquivos = [];
            listarArquivosEDiretorios(caminhoItem, fileInfo); // Recursão para subpastas
        }

    });

}


app.get("/files", function(req, res){

    var root = { nome: "Frison", tipo : "pasta", caminho: "", arquivos : []}
    listarArquivosEDiretorios("public/classes", root);
    console.log("Enviando Lista de Arquivos ");
    res.send({success: true, result : root });
})

var PublicPath = __dirname + "/public/";
app.use(express.static( PublicPath ));
app.listen(port, "0.0.0.0");


