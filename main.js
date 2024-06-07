//-----------------TASKS---------------------------//
const tasks = [
  {id: 1, title: "Do coding challenges", completed: false},
  {id: 2, title: "Do coding challenges", completed: false},
  {id: 3, title: "Do coding challenges", completed: true},
  {id: 4, title: "Project CSS 5.4 Final Cut", completed: false},
  {id: 5, title: "HTML Website HardCore", completed: true},
  {id: 6, title: "Python Detection Move", completed: true},
]
const ul_aTask = document.querySelector('.aItem') //Seleccionar el 'ul' que contiene los 'li'
let activeList = 'all';

//-----------------SHOW BAR & BUTTON, AND  HIDE BUTTONDELETE---------------------------//
function showBar() {
  document.getElementById('bar').style.display = 'flex';
  document.getElementById('buttonContainer').style.display = 'none';
}
//-----------------HIDE: BAR & BUTTON, AND  SHOW: BUTTONDELETE---------------------------//
function hideBar() {
  document.getElementById('bar').style.display = 'none';
  document.getElementById('buttonContainer').style.display = 'flex';
}
//-----------------FILTER ALL---------------------------//
function filterAll(){
  ul_aTask.innerHTML = ""; // Limpia primero el contenido del 'ul', borrando así los 'li'
  tasks.forEach(i =>{  //Llama a todos los objetos('li') del array 'tasks'
    DomElements(i.id, i.title, i.completed)
  })
  showBar(); //Aplica la función showBar: muestra la barra de adicionar y el boton 'add', y oculta el boton de 'delete all'
  const trashIcons = document.querySelectorAll('.fa-trash');
  trashIcons.forEach(icon =>{ //Llama a todos los iconos 'fa-trash'
    icon.style.display = 'none'; //Esconde todos los iconos de Basura
  });
}
//-----------------FILTER COMPLETED---------------------------//
function filterCompleted(){
  ul_aTask.innerHTML = ""; // Limpia primero el contenido del 'ul', borrando así los 'li'
  const tasksCompleted = tasks.filter(i => i.completed === true); //Usa '.filter' para solo encontrar los objetos('li') que contengan 'true'
  tasksCompleted.forEach(i =>{ //Llama cada objeto filtrado('li') del array
    DomElements(i.id, i.title, i.completed);
  });
  hideBar(); //Aplica la función hideBar: oculta la barra de adicionar y el boton 'add', y muestra el boton de 'delete all'
  const trashIcons = document.querySelectorAll('.fa-trash');
  trashIcons.forEach(icon => { //Llama a todos los iconos 'fa-trash'
    icon.style.display = 'inline-block'; //Muestra todos los iconos de Basura
  });
}
//-----------------FILTER UNCOMPLETED---------------------------//
function filterUncompleted() {
  ul_aTask.innerHTML = ""; // Limpia primero el contenido del 'ul', borrando así los 'li'
  const tasksUncompleted = tasks.filter(i => i.completed === false); //Usa '.filter' para solo encontrar los objetos('li') que contengan 'false'
  tasksUncompleted.forEach(i =>{ //Llama cada objeto filtrado('li') del array
    DomElements(i.id, i.title, i.completed);
  });
  showBar(); //Aplica la función showBar: muestra la barra de adicionar y el boton 'add', y oculta el boton de 'delete all'
}
//-----------------CONST FILTERS---------------------------//
const all = document.querySelector('#all')
const active = document.querySelector('#active')
const completed = document.querySelector('#completed')
//-----------------FUNCTION FOR FILTERS---------------------------//
const todasLasListas = document.querySelectorAll('.list_item'); //Llama todos los las listas por la clase
todasLasListas.forEach(item => { //Llama cada lista
    item.addEventListener('click', function() { //Cada vez que alguien haga click...
        todasLasListas.forEach(i => {i.classList.remove('active')}); //... primero será removido la 'class=active'...
        this.classList.add('active'); //... y será añadido la 'class="active"' a la lista clickada.
        if (this.id === 'all') { //Si es clickado en 'id="all"'...
            filterAll(); //...se activará esta función 
        } else if (this.id === 'active') { //Si es clickado en 'id="active"'...
            filterUncompleted(); //...se activará esta función 
        } else if (this.id === 'completed') { //Si es clickado en 'id="completed"'...
            filterCompleted(); //...se activará esta función 
        }
    });
});
//-----------------FUNCTION TO DELETE A TASK---------------------------//
function eliminartarea(id) {
  const index = tasks.findIndex(i => i.id === id); //'.findIndex' trae un único objeto id, el indice
  tasks.splice(index, 1); //'.splice' elimina el objeto
  filterCompleted(); // Llama la lista de completados despues de eliminar el objeto
}
//-----------------FUNCTION TO ELIMINATE ALL TASKS---------------------------//
function limparTarefasCompletasAll() {
  const tasksTrue = tasks.filter(task => task.completed); // Filtra apenas los objetos('li') true. No se filtran los false.
  tasksTrue.forEach(completedTask => {
      const index = tasks.findIndex(i => i.id === completedTask.id); // Encontra el indice de objeto true en el array
      if (index !== -1) { //Si el índice encontrado es distinto de -1 (es decir, si la tarea completa se encontró en la matriz de tareas)...
          tasks.splice(index, 1); //...remueve todas los objetos true.
          const listItem = document.querySelector(`#item${completedTask.id}`).closest('li'); // Encuentra el elemento <li> correspondiente a la tarea completada
          if (listItem) {
              listItem.remove(); // Remueve el elemento <li> de la lista "All"
          }
      }
  });
}
//-----------------EVENTS FOR FILTERS---------------------------//
all.addEventListener('click', function() {
  activeList = 'all';
  filterAll();
});

active.addEventListener('click', function() {
  activeList = 'active';
  filterUncompleted();
});

completed.addEventListener('click', function() {
  activeList = 'completed';
  filterCompleted();
});

//-----------------GENERAL FUNCTION TO CREATE---------------------------//
function DomElements (id, title, completed){
  const listItem = document.createElement('li'); //Cream el 'li'
  const checkbox = document.createElement('input'); //Crea el 'input checkbox'
  const label = document.createElement('label'); //Crea el 'label'

  checkbox.type = 'checkbox'; // Define los atributos y el contenido del 'input checkbox'
  checkbox.id = `item${id}`;
  checkbox.name = `item${id}`;
  checkbox.checked = completed;

  label.htmlFor = `item${id}`; // Define los atributos y el contenido del 'label'
  label.textContent = title;

  listItem.appendChild(checkbox); // Adiciona el 'input checkbox' para dentro del 'li'
  listItem.appendChild(label); // Adiciona el 'label' para dentro del 'li'

  if (completed) { //En la condición if se coloca que pasa si estamos viendo la lista 'completed'
    label.classList.add('strikethrough'); //Los 'li' tendrán el texto tachado
    const trashIcon = document.createElement('i');// Se crea el icono 'i'
    trashIcon.className = 'fa-solid fa-trash'; // Define los atributos y el contenido del 'i'
    trashIcon.id = `trashJava${id}`;
    trashIcon.style.marginLeft = 'auto';
    trashIcon.style.color = '#ccc';
    trashIcon.style.cursor= 'pointer';
     // Adiciona o estilo de hover quando o mouse passa sobre o ícone
     trashIcon.addEventListener('mouseover', function() {
      trashIcon.style.color = '#a3a3a3';
    });
    
    // Remove o estilo de hover quando o mouse deixa o ícone
    trashIcon.addEventListener('mouseout', function() {
        trashIcon.style.color = '#ccc';
    });
    trashIcon.addEventListener('click', function() { // Añade un evento al icono de basura 'i'
      eliminartarea(id); // Llama la función de eliminar solo una tarea de acuerdo con el id
      });
 
    const deleteButton = document.querySelector('.deleteButton'); //Escojemos del html el boton 'deletebutton'
    deleteButton.addEventListener('click', function() { // Añade un evento al boton 'deletebutton'
      limparTarefasCompletasAll(); // Llama la función de eliminar todas las tareas true
    });
 
    listItem.appendChild(trashIcon); // Adiciona el icono 'i' para dentro del 'li'
  }
  ul_aTask.appendChild(listItem); // Adiciona el 'li' para dentro del 'ul'

  //Lógica del checkbox
  checkbox.addEventListener('change', function() {
    const label = this.nextElementSibling; // Obtém o próximo elemento irmão, que é a label
    // Atualiza o estado da tarefa
    const taskId = parseInt(this.id.replace('item', '')); // Obtém o ID da tarefa
    const task = tasks.find(task => task.id === taskId); // Encontra a tarefa pelo ID
    if (task) {
        task.completed = this.checked; // Atualiza o estado da tarefa com base na marcação do checkbox
        // Atualiza a classe strikethrough da label
        if (this.checked) {
            label.classList.add('strikethrough'); // Adiciona a classe 'strikethrough' quando a caixa é marcada
        } else {
            label.classList.remove('strikethrough'); // Remove a classe 'strikethrough' quando a caixa é desmarcada
        }
        // Verifica a lista ativa
        if (activeList === 'active') {
            // Se estamos na lista 'Active', removemos o item da lista quando ele for marcado como concluído
            if (this.checked) {
                const listItem = this.closest('li'); // Encontra o elemento <li> pai mais próximo
                listItem.remove(); // Remove o item da lista
            }
        } else if (activeList === 'completed') {
            // Se estamos na lista 'Completed', removemos o item da lista quando ele for desmarcado
            if (!this.checked) {
                const listItem = this.closest('li'); // Encontra o elemento <li> pai mais próximo
                listItem.remove(); // Remove o item da lista
            }
        }
    }
});

}

//-----------------CREATE NEW TASK---------------------------//
const addButton = document.getElementById('button'); // Selecciona el boton 'Add'
addButton.addEventListener('click', function() { // Añade un evento al boton 'Add'
    const input = document.querySelector('.barInput'); // Selecciona el 'input'
    const newTaskTitle = input.value.trim(); // Obtiene el valor del texto de la entrada y elimina los espacios en blanco al principio y al final
    if (newTaskTitle !== '') { // Comprueba que el título de la nueva tarea no esté vacío
        const newTask = { // Crea un objeto que representa la nueva tarea
            id: tasks.length + 1,
            title: newTaskTitle,
            completed: false
        };
        tasks.push(newTask); // Añade la nueva tarea al array 'tasks'
        DomElements(newTask.id, newTask.title, newTask.completed); // Crea los elementos HTML para la nueva tarea.
        input.value = ''; // Limpia el texto del input
    }
});
//-----------------CHECKBOX FUNCTION---------------------------//
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const label = this.nextElementSibling; // Pega o elemento irmão seguinte, que é a label
    // Atualiza o estado da tarefa
    const taskId = parseInt(this.id.replace('item', '')); // Obtém o ID da tarefa
    const task = tasks.find(task => task.id === taskId); // Encontra a tarefa pelo ID
    if (task) {
      task.completed = this.checked; // Atualiza o estado da tarefa com base na marcação do checkbox
      // Atualiza a classe strikethrough da label
      if (this.checked) {
        label.classList.add('strikethrough'); // Adiciona a classe 'strikethrough' quando a caixa é marcada
      } else {
        label.classList.remove('strikethrough'); // Remove a classe 'strikethrough' quando a caixa é desmarcada
      }
    }
  });
});


