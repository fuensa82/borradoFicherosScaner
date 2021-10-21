const fs = require('fs');
const rutaInicio = 'F:\\DatosUsuarios\\Escaner';
const rutaBasura = 'F:\\DatosUsuarios\\BasuraEscaner';
var date=new Date();
date.setDate(date.getDate()-7);
console.log("Fecha a borrar: "+date);
console.log("Ejecutando...");
function iniciarBorrado(path){
    console.log("Ruta: "+path);
    fs.readdir(path,(err,files)=>{
        files.forEach(file=>{
            fs.stat(path+"\\"+file,(error,estado)=>{
                //console.log("Estado: "+estado.mtime);
                if(estado.isFile()){
                    if(estado.mtime<date){
                        console.log("\nFichero a borrar: "+path+"\\"+file);
                        fs.rename(path+"\\"+file,rutaBasura+"\\"+file,function(err){

                        });
                    }else{
                        console.log("\nFichero que se queda: "+path+"\\"+file);
                    }
                }else{
                    if(file!="Policia"){
                        iniciarBorrado(path+"\\"+file);
                    }else{
                        console.log("Estamos en la carpeta Policia y la dejamos sin tocar");
                    }
                }
            })
        })
    });
}
iniciarBorrado(rutaInicio);