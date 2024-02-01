
class Activity{
    constructor(id, title, description, imagenUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imagenUrl = imagenUrl;
    }
}

class Repository{
    constructor(){
        this.activities = [];
    }

    getAllActivities(){
        return this.activities;
    }

    createActivity(id, title, description, imagenUrl){
        let nuevaActividad = new Activity(id, title, description, imagenUrl); // con cada nueva actividad se crea un nuevo object
        nuevaActividad.id = this.activities.length + 1; // utilizo la longitud de this.activities para usarlo como id a declarar
        this.activities.push(nuevaActividad);
    }
    
    deleteActivity(id){
        this.activities = this.activities.filter((element) => element.id !== id);
    }
}

const cargarActividad=(object)=>{
      
    // destructuring las propiedades del object
    const {id, title, description, imagenUrl} = object;

    // creo los elementos HTML para el DOM
    const nuevoDiv = document.createElement('div');
    const nuevoTitulo = document.createElement('h3');
    const nuevoDivImagen = document.createElement('div');
    const nuevoLinkImagen = document.createElement('img');
    const nuevaDescripcion = document.createElement('p');

    // cargo los valores obtenidos en las propiedades creadas
    nuevoTitulo.textContent = title;
    nuevoLinkImagen.src = imagenUrl;
    nuevaDescripcion.textContent = description;

    // creamos la clases a las propiedades creadas en el div
    nuevoDiv.classList.add('tarjeta')
    nuevoTitulo.classList.add('titulo-actividad');
    nuevoDivImagen.classList.add('container-image');
    nuevoLinkImagen.classList.add('nueva-imagen');

    // sugerencia de chatgpt
    // Asignar un id al div basado en el id de la actividad, parar poder borralo a futuro
    nuevoDiv.id = `tarjeta-${id}`;

    //appendeo dentro del div padre 'coleccion' el h3, img, p
    nuevoDiv.appendChild(nuevoTitulo);
    nuevoDivImagen.appendChild(nuevoLinkImagen);
    nuevoDiv.appendChild(nuevoDivImagen);
    nuevoDiv.appendChild(nuevaDescripcion);
    
    return nuevoDiv;
}

const convertirInstancias = (object) => {

    // obtengo el container padre con id 'coleccion' de HTML
    const container = document.getElementById('coleccion');
    //vacio el container
    container.innerHTML = '';
    //obtengo el classname de coleccion
    const estaOoculto = container.className;
    // cambio de ocluto a coleccion-tarjetas
    if (estaOoculto == 'oculto') {
        container.className = 'coleccion-tarjetas';
    }
    // guardo el array de actividades
    const repository = object.getAllActivities();
    // mapeo cada actividad usando la function 'cargarActividad' asi me devuelve un div x cada actividad
    // cada div completo se guarda en un indice del array
    const datosMapeados = repository.map(cargarActividad)

    // con forEach agrego cada div en el container
    datosMapeados.forEach(div => {
        container.appendChild(div)
    });    
}

// instancio nueva clase de repository
const nuevaActividad = new Repository();

const agregarTarjeta = () =>{

    // obtengo los valores de los input al momento de hacer click
    const tituloActividad = document.getElementById('titulo-actividad');
    const linkImagen = document.getElementById('link-imagen');
    const descripcion = document.getElementById('descripcion');

    const valorTituloActividad = tituloActividad.value;
    const valorLinkImagen = linkImagen.value;
    const valorDescripcion = descripcion.value;
    
    if (valorTituloActividad == '' || valorLinkImagen == '' || valorDescripcion == '') {
        alert('Falta completar algun campo');
    }
    else {        
        let id = 0;
        nuevaActividad.createActivity(id, valorTituloActividad, valorDescripcion, valorLinkImagen);        
        convertirInstancias(nuevaActividad);
        // reset de inputs despues de agregar la tarjeta
        tituloActividad.value = '';
        linkImagen.value = '';
        descripcion.value = '';
    }
}

const borrarTarjeta = () =>{

    // pregunto al usuario que id borrar
    const id = parseInt(prompt('Indique el numero de "id" a borrar'));

    // obtengo el div con su id declarado en cargarActividad()
    const itemABorrar = document.getElementById(`tarjeta-${id}`);
    // lo borro del DOM
    itemABorrar.remove();

    // lo borro del array de la clase actual usando el id ingresado
    nuevaActividad.deleteActivity(id);
}

const botonAgregar = document.getElementById('boton-agregar');
const botonBorrar = document.getElementById('boton-borrar');

// con esto evito el error del Quokka "Cannot read properties of null (reading 'addEventListener')"
if (botonAgregar && botonBorrar) {
    //    --> cuando hagas el evento click --> ejecuta el cb 'agregarTarjeta'
    botonAgregar.addEventListener('click', agregarTarjeta);
    botonBorrar.addEventListener('click', borrarTarjeta);
}

//obtengo el formulario con submit
const formulario = document.querySelector('#formulario');
// agrego un evento que previene el refresh de la pagina cuando se ejecute el submit
formulario.addEventListener('submit', function(event) {
   event.preventDefault() ;
});

// declaro las functions a exportar para los test
module.exports = {
    Activity,
    Repository
};