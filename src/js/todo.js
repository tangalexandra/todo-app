function render(state) {
  const ulToDo = document.querySelector('#todo-list');
  while (ulToDo.firstChild) {
    ulToDo.removeChild(ulToDo.firstChild);
  }
  state.forEach((note, index) => {
    const newToDo = document.createElement('li');
    newToDo.setAttribute('id', index);
    let html = `<h3 id="${index}" class="underline card">${note.title}</h3><p id="${index}" class="card">${note.description}</p>`;
    if (note.done) {
      newToDo.classList.add('done');
      html += `<button class="btn btn-remove" type="button" id=${index}>Remove</button>`;
    } else {
      newToDo.classList.remove('done');
      html += `<button class="btn btn-remove" style="display:none" type="button" id=${index}>Remove</button>`;
    }
    newToDo.innerHTML = html;
    ulToDo.appendChild(newToDo);
  });
}

function updateLocalStorage(storageObject) {
  localStorage.setItem('toDoListObject', JSON.stringify(storageObject));
}

function getState() {
  const myLocalStorage = localStorage.getItem('toDoListObject');
  const myObj = myLocalStorage ? JSON.parse(myLocalStorage) : { toDoList: [] };
  return myObj.toDoList;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#note');
  const ulToDo = document.querySelector('#todo-list');
  const state = getState();
  render(state);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input');
    state.unshift({ title: inputs[0].value, description: inputs[1].value, done: false });
    inputs[0].value = '';
    inputs[1].value = '';
    updateLocalStorage({ toDoList: state });
    render(state);
  });

  ulToDo.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
      const btn = e.target;
      state.splice(btn.id, 1);
    } else if (e.target.nodeName === 'LI' || e.target.classList.contains('card')) {
      state[e.target.id].done = !state[e.target.id].done;
    }
    updateLocalStorage({ toDoList: state });
    render(state);
  });
});
