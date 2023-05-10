const myArray = [];

const saveTodoInput = document.getElementById("saveTodo");

saveTodoInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodo();
  }
});

const todoAddBtn = document.getElementById("btnSave");
todoAddBtn.addEventListener("click", function(event) {
  event.preventDefault();
  addTodo();
});

function addTodo() {
  let value = saveTodoInput.value.trim();
  value = value.replace(/\s{2,}/g, ' ');
  if (value !== "") {
    myArray.push(value);
    saveTodoInput.value = "";
    console.log("Добавлен элемент: " + value);
    console.log("Массив: " + myArray);
    createTodoList();
  }
}

function createTodoList() {
  const todoContainer = document.getElementById("todoContainer");
  todoContainer.innerHTML = "";

  myArray.forEach((item, index) => {
    const listItem = document.createElement("div");
    listItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    listItem.appendChild(checkbox);

    const textContainer = document.createElement("div");
    textContainer.textContent = item;
    listItem.appendChild(textContainer);

    let isDoubleClick = false;
    let isCheckboxClicked = false;
    let isEditing = false; // Флаг редактирования

    checkbox.addEventListener("click", function() {
      if (!isCheckboxClicked && !isEditing) {
        isCheckboxClicked = true;
        setTimeout(function() {
          isCheckboxClicked = false;
        }, 100);
      } else {
        checkbox.checked = !checkbox.checked;
        isCheckboxClicked = false;
      }
    });

    listItem.addEventListener("click", function() {
      if (!isDoubleClick && !isCheckboxClicked && !isEditing) {
        isDoubleClick = true;
        setTimeout(function() {
          isDoubleClick = false;
        }, 300);
      } else if (!isCheckboxClicked && !isEditing) {
        isEditing = true; // Устанавливаем флаг редактирования
        textContainer.innerHTML = "";
        const input = document.createElement("input");
        input.type = "text";
        input.value = item;
        listItem.appendChild(input);
        input.focus();

        input.addEventListener("keydown", function(event) {
          if (event.key === "Enter") {
            event.preventDefault();
            item = input.value.trim();
            textContainer.textContent = item;
            myArray[index] = item;
            listItem.removeChild(input);
            isEditing = false; // Сбрасываем флаг редактирования
          }
        });
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", function() {
      myArray.splice(index, 1);
      createTodoList();
    });
    listItem.appendChild(deleteBtn);

    todoContainer.appendChild(listItem);
  });
}
