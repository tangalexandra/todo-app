function addNotesToHTML(HTMLelement, notes) {
    notes.forEach((note, index) => {
      const newToDo = document.createElement('li');
      let html = `<h3 class="underline">${note.title}</h3><p>${note.description}</p>`;
      if (note.done) {
        newToDo.classList.add('done');
        html += `<button class="btn btn-remove" type="button" id=${index}>Remove</button>`;
      } else {
        newToDo.classList.remove('done');
        html += `<button class="btn btn-remove" style="display:none" type="button" id=${index}>Remove</button>`;
      }
      newToDo.innerHTML = html;
      HTMLelement.appendChild(newToDo);
    });
  }
  
  function updateLocalStorage(storageObject) {
    localStorage.setItem('toDoListObject', JSON.stringify(storageObject));
    document.location.reload();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#note');
    const myLocalStorage = localStorage.getItem('toDoListObject');
    const myObj = myLocalStorage ? JSON.parse(myLocalStorage) : { toDoList: [] };
    const toDoListArray = myObj.toDoList;
    const ulToDo = document.querySelector('#todo-list');
    addNotesToHTML(ulToDo, toDoListArray);
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input');
      toDoListArray.unshift({ title: inputs[0].value, description: inputs[1].value, done: false });
      inputs[0].value = '';
      inputs[1].value = '';
      updateLocalStorage(myObj);
    });
  
    ulToDo.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const btn = e.target;
        toDoListArray.splice(btn.id, 1);
      } else if (e.target && e.target.nodeName === 'LI') {
        const btn = e.target.querySelector('button');
        toDoListArray[btn.id].done = toDoListArray[btn.id].done ? false : true;
      }
      updateLocalStorage(myObj);
    });
  });
  