const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const btnAgregar = document.querySelector("#enter");

// Clases de los iconos y el subrayado para cuando la tarea se completa
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';

// EL id sirve para poder identificar cada tarea, para luego poder eliminarla o marcarla
//como completada
let id = 0;

// Array para guardar las tareas
const listaTareas = [];

// Agregado de localstorage para que las tareas agregadas queden guardadas incluso si el navegador se cierra


// Creacion de funcion que actualiza la fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-AR', {weekday:'long', month:'short', day:'numeric'});


// Funcion para agregar tareas a la lista
const AgregarTareas = (tarea, id, realizado, eliminado) => {

    // Si eliminado es true, entonces el codigo debajo de este if no se ejecuta.
    if(eliminado) {return;}

    // Asigno el proceso de realizado por el cual se marca como realizada la tarea

    // Este ternario dice: Si realizado es true, entonces va a tomar el valor de check,
    //Si es false, entonces toma el valor de uncheck.
    const REALIZADO = realizado ?check :uncheck;
    
    // Genero los elementos li de la tarea con DOM
    const li = document.createElement("li");
    li.id = "elemento";

    const iconoCompletado = document.createElement("i");
    iconoCompletado.classList.add('far', REALIZADO);
    iconoCompletado.setAttribute("data", "realizado");
    iconoCompletado.id = id;
    console.log(iconoCompletado);

    const textoTarea = document.createElement("p");
    textoTarea.classList.add("text");
    if (realizado) textoTarea.classList.add("lineThrough");
    textoTarea.innerText = tarea;

    const iconoBorrar = document.createElement("i");
    iconoBorrar.classList.add('fas', 'fa-trash', 'de');
    iconoBorrar.setAttribute("data", "eliminado");
    iconoBorrar.id = id;
    console.log(iconoBorrar);

    li.append(iconoCompletado, textoTarea, iconoBorrar);
    lista.append(li);
}

// Funcion para marcar la tarea como realizada
const tareaRealizada = (element) => {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);

    // parentNode se utiliza para identificar elementos hijo en este caso dentro de element y que contenga la clase .text, se hace de la siguiente manera:
    // Le dice: Quiero que vayas hasta el elemento padre de element, y que dentro de el me selecciones el elemento hijo que tenga la clase .text
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);

    // Este ternario, basicamente, lo que hace es invertir el valor false del elemento por un true. Ya que en la funcion en la cual se
    // agrega la tarea a la lista, se inicializa su valor en false y eso hay que cambiarlo.
    listaTareas[element.id].realizado = listaTareas[element.id].realizado ?false :true;
}

// Funcion  para eliminar tareas
const tareaEliminada = (element) => {
    // Aca le estas diciendo que vaya del icono de eliminar al li, del li al ul y desde el ul que remueva el li.
    element.parentNode.parentNode.removeChild(element.parentNode);
    listaTareas[element.id].eliminado = true;
}

// Funcion para que cuando se cliquee el boton +, se cree la tarea:
btnAgregar.addEventListener("click", () => {
    const tarea = input.value;

    // Si el input de tareas tiene algun valor, entonces creas la tarea.
    if(tarea) {
        AgregarTareas(tarea, id, false, false)
        listaTareas.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
    }

    input.value = '';
    id ++;
});

// Funcion para que cuando se toque enter en el teclado, se cree la tarea:
document.addEventListener("keyup", (e) => {
    if(e.key == "Enter") {
        const tarea = input.value;

        if(tarea) {
            AgregarTareas(tarea, id, false, false);
            listaTareas.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            console.log(listaTareas);
        }

        input.value = '';
        id++;
    }
});

lista.addEventListener("click",function(event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if(elementData === 'realizado') {
        tareaRealizada(element);
    }
    else if(elementData === 'eliminado') {
        tareaEliminada(element);
    }
});
