import {Tarea} from "./tarea.js";
const db = {
  tareas: [],
  id: 0,
};
const principal = document.getElementById("lista-de-tareas");
console.log(db);
const input = document.createElement("input");
const btnAdd = document.createElement("button");
const ul = document.createElement("ul");
let id = 0;
btnAdd.innerHTML = "Añadir";

principal.appendChild(input);
principal.appendChild(btnAdd);
principal.appendChild(ul);

function addTarea() {
  const textoTarea = input.value;
  input.value = "";
  if (
    textoTarea.trim() !== "" &&
    !db.tareas.map((x) => x.texto).includes(textoTarea)
  ) {
    db.id++;

    db.tareas.push(new Tarea(db.id, textoTarea, false));
    pintarTareas(id);
    guardarCambios()
    input.focus();
  }
}

//ejercicio: añadir un evento de click al boton añadir para que añada una tarea a
//db.tareas. Una vez añadido, limpiar el input

btnAdd.addEventListener("click", () => {
  addTarea();
});

console.log(db.tareas);

//ejercicio: añadir evento keyup al input para cuando el usuario pulse enter
//se genere la tarea

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTarea();
  }
});

//ejercicio: crea una funcion pintar tareas que recorra las tareas de la db
//y las pinte en el ul utilizando elementos li para cada tarea

function pintarTareas() {
  ul.innerHTML = "";
  for (const tarea of db.tareas) {
    const li = document.createElement("li");
    const divTarea = document.createElement("div");
    const span = document.createElement("span");
    const btnDone = document.createElement("button");
    const btnDelete = document.createElement("button");
    btnDone.innerHTML = "✅";
    btnDelete.innerHTML = "🗑️";
    span.innerHTML = tarea.texto;
    ul.appendChild(li);
    li.appendChild(divTarea);
    li.id = tarea.id;
    divTarea.appendChild(btnDone);
    divTarea.appendChild(btnDelete);
    divTarea.appendChild(span);
    btnDelete.className = "texto";
    span.className = "texto";
    li.className = "lista";

    btnDelete.addEventListener("click", () => {
      // db.tareas.splice(tarea.id, 1); Lo hare con filter
      db.tareas = db.tareas.filter(t => t.id !== tarea.id);
      ul.removeChild(li);
      guardarCambios()
    });

    btnDone.addEventListener("click", () => {
      if (tarea.hecho) {
        tarea.hecho = false;
        span.classList.remove("hecho");
      } else {
        tarea.hecho = true;
        span.classList.add("hecho");
      }
    });
  }guardarCambios()
}
function guardarCambios() {
  localStorage.setItem('lista', JSON.stringify(db))
  
}
//ejercicio: en la funcion addTarea, cambiala de manera que no se pueda
//añadir tareas repetidas (HECHO ARRIBA)

//añadir al texto generado dos botones (D & X)

//cambiar addTareas para añadir un objeto con id, texto y hecho (booleano)

// const tareas = ['comprar pan','echar gasolina']

// for(const tarea of tareas){
//     const elementoTarea=document.createElement('li')
//     elementoTarea.innerHTML=tarea
//     principal.appendChild(elementoTarea)
// }
