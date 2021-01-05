//To do
const button_list = document.querySelector('.button_list');
const task = document.querySelector('.task');
const todo_text = document.querySelector('.todo_text');

let listMessege = [];
let addList = {};
if (localStorage.getItem('todo')) {
  listMessege = JSON.parse(localStorage.getItem('todo'));
  displMess();
}
//кнопка добавить задачу
button_list.addEventListener('click', () => {
  // нельзя добавить задачу если пустое поле
  if (todo_text.value == '') {
    return false;
  }
  //объек для добавления в массив
  addList = {
    todoName: todo_text.value,
    checked: false,
  };
  todo_text.value = ''; // очищение поля ввода после добавления задачи
  listMessege.unshift(addList); // добавление объекта в начало массива
  localStorage.setItem('todo', JSON.stringify(listMessege));
  displMess();
  checkChecked();
  deleteTask();
});
//метод добавляет задачу в массив
function displMess() {
  let mes = '';
  listMessege.forEach((item, i) => {
    mes += `
    <li>
        <label for="item_${i}">
        <input type="checkbox" id="item_${i}" ${
      item.checked ? 'checked' : ''
    }  class="checkbox" />
        <span class="check"></span>
        <span class="text">${item.todoName}</span>
        </label>
        <span class="delete"></span>
    </li>`;
    task.innerHTML = mes;
  });
}

//сохранение checkbox --------------- ДОДЕЛАТЬ
// task.addEventListener('change', (event) => {
//   //const forLabel = event.target.getAttribute('id');
//   let idInput = task.querySelector(
//     '[for=' + event.target.getAttribute('id') + ']'
//   );
//   listMessege.forEach((item, i) => {
//     if (idInput === item.todoName) {
//       //console.log(listMessege.indexOf(item));
//       item.checked = !item.checked;
//       console.log(item.checked);
//     }
//   });
// });

//checkbox отмечент и задача выполнена
function checkChecked() {
  const checkbox = document.querySelectorAll('.checkbox');
  const text = document.querySelectorAll('.text');
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click', () => {
      if (checkbox[i].checked) {
        text[i].style.textDecoration = 'line-through';
      } else {
        text[i].style.textDecoration = 'none';
      }
    });
  }
}

//удаление задачи из списка
function deleteTask() {
  if (listMessege.length === 0) {
    task.innerHTML = '';
    localStorage.setItem('todo', JSON.stringify(listMessege));
  }
  const delet = document.querySelectorAll('.delete');
  const li = document.querySelector('li');
  delet.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (task.contains(li)) {
        listMessege.splice(i, 1);
        displMess();
        checkChecked();
      }
    });
    localStorage.setItem('todo', JSON.stringify(listMessege));
  });
}
task.addEventListener('click', deleteTask);

// тренеровочный лагерь
// let test = document.querySelector('#test');
// let li = document.createElement('li');
// let txt = document.createTextNode('X');
// test.append(li);
// li.appendChild(txt);
// let people = {
//   name: 'Jon',
//   age: 27,
//   ros: 185,
// };
// localStorage.setItem('people', JSON.stringify(people));

// if (localStorage.getItem('people')) {
//   let p = JSON.parse(localStorage.getItem('people'));
//   console.log(p);
// }
