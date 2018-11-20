const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer); //convierte un objeto a un json
  fs.writeFile('db/data.json',data,(err)=>{
    if(err){
      throw new Error("no se ha podido grabar",err);
    }
    console.log('tarea guardada');
  });
}

const cargarDB = () => {
  try{
    listadoPorHacer = require('../db/data.json');
  }catch(error){
    listadoPorHacer = [];
  }
}


const crear = (descripcion)=>{
  cargarDB();

  let porHacer = {
    descripcion,     //essto es lo mismo que hacer descripcion:descripcion,
    completado: false
  };
  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer; //para tener retroalimentación de que se ha creado esto
}

const getListado = ()=>{
  cargarDB();
  return listadoPorHacer;
}

//por defecto completado la pongo a true si no me lo envían
const actualizar = (descripcion,completado = true) => {
  cargarDB();
  let index = listadoPorHacer.findIndex( tarea =>{
      return tarea.descripcion === descripcion;
  });
  if(index>=0){
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }else{
    return false;
  }
}

const borrarGarrulo = (descripcion)=>{
  cargarDB();
  let index = listadoPorHacer.findIndex( tarea =>{
    return tarea.descripcion === descripcion;
  })
  if(index!=-1){
    listadoPorHacer.splice(index,1);
    guardarDB();
    return true;
  }else{
    console.log('no existe tarea a borrar');
    return false;
  }
}

const borrar = (descripcion) => {
  cargarDB();
  let nuevoListado = listadoPorHacer.filter(tarea => {
    return tarea.descripcion!=descripcion;
  });
  if(listadoPorHacer.length == nuevoListado.length){
    //no se ha borrado nada porque no existe
    return false;
  }else{
    listadoPorHacer = nuevoListado;  //porque guardarDB guarda listadoPorHacer
    guardarDB();
    return true;
  }
}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrarGarrulo,
  borrar
}
