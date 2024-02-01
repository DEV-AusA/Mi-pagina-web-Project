// const {
//     arrayFiltrar,
//     toDoList
// } = require("../../scripts/index-test");


describe("Esto debe ser un array", () => {

    it("la function debe existir", () => {
        expect(arrayFiltrar).toBeDefined();
    });
    // declaramos que lo que se cargue en ArrayFiltrar sea un array, x ende tiene que ser true
    it("el contenido del array debe ser el mismo", ()=>{
        expect(Array.isArray(arrayFiltrar([1, 2, 3, 4, 5, 6]))).toBe(true);
    });

    it("debe retornar un array con numeros pares", () =>{
        // debe retornar numeros pares
        expect(arrayFiltrar([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
        expect(arrayFiltrar([2, 4])).toEqual([2, 4]);
        expect(arrayFiltrar([1, 2, 3, 5])).toEqual([2]);
        // no hay numeros pares debe devolver un array vacio
        expect(arrayFiltrar([1, 3, 5])).toEqual([]);
        // si no hay nada debe devolver un array vacio
        expect(arrayFiltrar([])).toEqual([]);
    })
});

// ToDoList
// - Debe ser una clase
// - Debe tener los metodos:
//          - getTodos(): debe retornar la lista de tareas
//          - addTodo(): deberia pushear al array una nueva tarea
//          - deleteTodo(): deberia eliminar la ultima tarea

describe("La clase toDoList", ()=>{
    it("Debe ser una clase",()=>{
        // con typeof retorna un string de lo que es
        expect(typeof toDoList.prototype.constructor).toBe("function");
    });

    it("Debe tener implementado el metodo getToDos()", ()=>{
        const lista = new toDoList();
        expect(lista.getToDos).toBeDefined();
    });
    it("Debe tener implementado el metodo addToDo()", ()=>{
        const lista = new toDoList();
        expect(lista.addToDo).toBeDefined();        
    });
    it("Debe tener implementado el metodo deleteToDo()", ()=>{
        const lista = new toDoList();
        expect(lista.deleteToDo).toBeDefined();
    });
    it("el metodo getToDos() debe retornar un Array", ()=>{
        const lista = new toDoList();
        // el matcher .tobeTrue hace que sea verdadero el expect
        expect(Array.isArray(lista.getToDos())).toBeTrue();
    });
    it("el metodo addToDo() debe agregar un nuevo elemento", ()=>{
        const lista = new toDoList();        
        // verifica que el metodo addToDo() contenga--->
        lista.addToDo("Hace la HW de la clase de hoy");
        //verifica que al ejecutar el metodo getToDos() con el matcher toEqual devuelva un Array que contenga el valor de ["Hace la HW de la clase de hoy"]
        expect(lista.getToDos()).toEqual(["Hace la HW de la clase de hoy"]);
        //verifica que al ejecutar el metodo getToDos() con el matcher .toContain tenga el contenido "Hace la HW de la clase de hoy" del Array
        expect(lista.getToDos()).toContain("Hace la HW de la clase de hoy");
    });
    it("El metodo deleteTodo() debe eliminar la ultima tarea", ()=>{
        const lista = new toDoList();
        // al ejecutar la function addToDo() deberia agregar cada elemento al Array
        lista.addToDo("A");
        lista.addToDo("B");
        lista.addToDo("C");
        // al ejecutar la function deleteToDo() deberia eliminar el ultimo elemento al Array
        lista.deleteToDo();

        //al ejecutar el metodo getToDos() con el matcher .toContain tenga el contenido "A"
        expect(lista.getToDos()).toContain("A");
        //al ejecutar el metodo getToDos() con el matcher .toContain tenga el contenido "B"
        expect(lista.getToDos()).toContain("B");
        
        //al ejecutar el metodo getToDos() con el matcher .not.toContain NO DEBERIA tener el contenido "C" en el Array
        expect(lista.getToDos()).not.toContain("C");
    });


});