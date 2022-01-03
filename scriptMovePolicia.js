const fs = require('fs');
const rutaInicioW = 'F:\\DatosUsuarios\\Escaner';
//const rutaBasuraW = 'F:\\DatosUsuarios\\BasuraEscaner';
const rutaInicio1 = 'C:\\PruebasPolicia\\CtraTorrijos';
const rutaInicio2 = 'C:\\PruebasPolicia\\CtraCamarena';
//const rutaBasura = 'C:\\PruebasPolicia\\CtraCamarena';
const meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
var date=new Date();
date.setDate(date.getDate()-10);
console.log("Fecha a mover: "+date);
console.log("Ejecutando...");
function iniciarBorrado(path){
    console.log("Ruta: "+path);
    fs.readdir(path,(err,files)=>{
        files.forEach(file=>{
            fs.stat(path+"\\"+file,(error,estado)=>{
                //console.log("Estado: "+estado.mtime);
                if(estado.isFile()){
                    if(estado.mtime<date){

                        if (!fs.existsSync(path+"\\"+meses[estado.mtime.getMonth()])){
                            fs.mkdirSync(path+"\\"+meses[estado.mtime.getMonth()]);
                        }
                        console.log("\nFichero a mover: "+path+"\\"+file);
                        fs.rename(path+"\\"+file,path+"\\"+meses[estado.mtime.getMonth()]+"\\"+file,function(err){
                            console.log(err);
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
iniciarBorrado(rutaInicio1);