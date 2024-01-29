class Activity{
    constructor(title, description, imagenUrl){
        this.id = 0;
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

    createActivity(title, description, imagenUrl){
        let newActivity = new Activity(title, description, imagenUrl); // con cada nueva actividad se crea un nuevo object
        newActivity.id = this.activities.length + 1; // utilizo la longitud de this.activities para usarlo como id a declarar
        this.activities.push(newActivity);
    }
    
    deleteActivity(id){
        this.activities = this.activities.filter((element) => element.id !== id);
    }
}

//const actividad1 = new Activity('Cocinar', 'Hacer el almuerzo', 'www.cocinar.com');
// actividad1.createActivity('Cocinar', 'Hacer el almuerzo', 'www.cocinar.com');

const cargarActividad=(object)=>{
      
    // destructuring las propiedades del object
    const {id, title, description, imagenUrl} = object;

    // creo los elementos HTML para el DOM
    const nuevoDiv = document.createElement('div');
    const nuevoTitulo = document.createElement('h3');
    const nuevoLinkImagen = document.createElement('img');
    const nuevaDescripcion = document.createElement('p');

    // cargo los valores obtenidos en las propiedades creadas
    nuevoTitulo.textContent = title; // 
    nuevoLinkImagen.src = imagenUrl; //
    nuevaDescripcion.textContent = description;

    // creamos la clases a las propiedades creadas en el div
    nuevoDiv.classList.add('tarjeta')
    nuevoTitulo.classList.add('titulo-actividad');
    nuevoLinkImagen.classList.add('nueva-imagen');

    // sugerencia de chatgpt
    // Asignar un id al div basado en el id de la actividad, parar poder borralo a futuro
    nuevoDiv.id = `tarjeta-${id}`;

    //appendeo dentro del div padre 'coleccion' el h3, img, p
    nuevoDiv.appendChild(nuevoTitulo);
    nuevoDiv.appendChild(nuevoLinkImagen);
    nuevoDiv.appendChild(nuevaDescripcion);
    
    return nuevoDiv;
}

// console.log(cargarActividad(actividad1));

// let repository1 = new Repository();
// repository1.createActivity('Cocinar', 'Hacer el almuerzo', 'www.cocinar.com');
// repository1.createActivity('Dormir', 'Hacer el la cama antes', 'www.dormir.com');

const convertirInstancias = (object) => {

    // obtengo el container padre con id 'coleccion' de HTML
    const container = document.getElementById('coleccion');
    //vacio el container
    container.innerHTML = '';
    // guardo el array de actividades
    const repository = object.getAllActivities();
    // mapeo cada actividad usando la function 'cargarActividad' asi me devuelve un div x cada actividad
    // cada div completo se guarda en un indice del array
    const datosMapeados = repository.map(cargarActividad)

    // con forEach agrego cada div en el container
    datosMapeados.forEach(div => {
        container.appendChild(div)
    });    
    //console.log(datosMapeados);
}

// instancio nueva clase de repository
const nuevaActividad = new Repository();

const agregarTarjeta = () =>{   

    // obtengo los valores de los input al momento de hacer click
    const tituloActividad = document.getElementById('titulo-actividad').value;
    const linkImagen = document.getElementById('link-imagen').value;
    const descripcion = document.getElementById('descripcion').value;
    
    if (tituloActividad == '' || linkImagen == '' || descripcion == '') {
        alert('Falta completar algun campo');
    }
    else {        
        nuevaActividad.createActivity(tituloActividad, descripcion, linkImagen);        
        convertirInstancias(nuevaActividad);
    }

    // muestra el listado de los divs creados
    console.log(nuevaActividad);
}

const borrarTarjeta = () =>{

    console.log(nuevaActividad);

    // pregunto al usuario que id borrar
    const id = parseInt(prompt('Indique el numero de "id" a borrar'));

    // obtengo el div con su id declarado en cargarActividad()
    const itemABorrar = document.getElementById(`tarjeta-${id}`);
    // lo borro del DOM
    itemABorrar.remove();

    // lo borro del array de dla clase actual usando el id ingresado
    nuevaActividad.deleteActivity(id);

    // muestra el listado de los divs restantes
    console.log(nuevaActividad);
}

const botonAgregar = document.getElementById('boton-agregar');
const botonBorrar = document.getElementById('boton-borrar');
//    --> cuando hagas el evento click --> ejecuta el cb 'agregarTarjeta'
botonAgregar.addEventListener('click', agregarTarjeta);
botonBorrar.addEventListener('click', borrarTarjeta);