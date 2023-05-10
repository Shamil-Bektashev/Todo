const myArray = [];

const saveTodoInput = document.getElementById("saveTodo");
  const saveTodoForm = document.getElementById("formSaveTodo");

saveTodoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
      addTodo();
      
    }
  });

  const todoAddBtn = document.getElementById("btnSave");
  todoAddBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    addTodo();
  });



function addTodo() {
    let value = saveTodoInput.value.trim();
    if (value !== "") {
      myArray.push(value);
      saveTodoInput.value = "";
      console.log("Добавлен элемент: " + value);
      console.log("Массив: " + myArray);
    }
  }
