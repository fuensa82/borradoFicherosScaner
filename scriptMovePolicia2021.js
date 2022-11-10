const fs = require('fs');
const { exit } = require('process');

//var rutaAMover = new Array();
var rutaAMover=['CtraTorrijos',
                    'CtraCamarena',
                    'CtraPortillo',
                    'CtraToledo'];

const rutaServidor = 'F:\\DatosUsuarios\\Escaner\\Policia';
//const rutaServidor = 'C:\\PruebasPolicia';
const meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
var date=new Date();
date.setDate(date.getDate()-8);
console.log("Fecha a mover: "+date);
console.log("Ejecutando...");
function iniciarBorrado(path){
    console.log("Ruta: "+path);
    fs.readdir(path,(err,files)=>{
        console.log("readdir");
        files.forEach(file=>{
            console.log("Ruta: "+path);
            fs.stat(path+"\\"+file,(error,estado)=>{
                console.log("Estado: "+estado.mtime);
                if(estado.isFile()){
                    if(estado.mtime<date){

                        if (!fs.existsSync(path+"\\"+meses[estado.mtime.getMonth()])){
                            fs.mkdirSync(path+"\\"+meses[estado.mtime.getMonth()]);
                            if (!fs.existsSync(path+"\\"+meses[estado.mtime.getMonth()]+"\\"+estado.mtime.getDay())){
                                fs.mkdirSync(path+"\\"+meses[estado.mtime.getMonth()]+"\\"+estado.mtime.getDay());
                            }
                        }
                        console.log("\nFichero a mover: "+path+"\\"+file);
                        fs.rename(path+"\\"+file,path+"\\"+meses[estado.mtime.getMonth()]+"\\"+estado.mtime.getDay()+"\\"+file,function(err){
                            console.log(err);
                        });
                        console.log("\n"+path+"\\"+file,path+"\\"+meses[estado.mtime.getMonth()]+"\\"+estado.mtime.getDay()+"\\"+file);
                    }else{
                        console.log("\nFichero que se queda: "+path+"\\"+file);
                    }
                }else{
                     console.log("\nSe trata de un directorio") ; 
                }
            })
        })
    });
}
rutaAMover.forEach(ruta=>{
    iniciarBorrado(rutaServidor+"\\"+ruta);
});
process.exit(1);