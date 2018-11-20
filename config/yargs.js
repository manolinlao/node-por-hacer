const descripcion = {
  demand:true,
  alias:'d',
  desc: 'Descripción de la tarea'
}

const completado = {
  default:true,
  alias:'c',
  desc:'Marca como completado o pendiente la tarea'
}


/*la definición de comandos se hace con command
se le pasan 3 parámetros:
  - el nombre del parámetro
  - la descripción
  - un objeto con la descripción */
const argv = require('yargs')
  .command('crear',
    'Crear un elemento por hacer',
    {
      descripcion
    })
    .command('actualizar',
      'Actualiza el estado completado de una tarea',
      {
          descripcion,
          completado
      })
    .command('borrar','Borra una tarea',
            {
              descripcion
    })
    .help()
    .argv;

module.exports = {
  argv
}
