
const arrayFiltrar = (array) => array.filter((num) => num % 2 == 0);

class toDoList{
    constructor(){
        this.toDoList = [];
    }

    getToDos(){
        return this.toDoList;
    }

    addToDo(tarea){
        this.toDoList.push(tarea);
    }

    deleteToDo(){
        this.toDoList.pop();
    }
}

// // declaro las functions a exportar para los test
// module.exports = {
//     arrayFiltrar,
//     toDoList
// };