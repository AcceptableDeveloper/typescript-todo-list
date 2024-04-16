interface TodoItem {
  value: string;
  completed: boolean;
}

let percentageCompleted = 0;
let numberOfTodos = 0;

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById(
    "todo-add-button"
  ) as HTMLButtonElement;
  const inputField = document.getElementById("todo-input") as HTMLInputElement;
  const todoList = document.getElementById("todo-list") as HTMLUListElement;

  submitButton.addEventListener("click", handleAddTodo);

  function handleAddTodo() {
    const todoText = inputField.value;
    if (!checkInputValidity(todoText)) {
      alert("Please enter a valid todo item");
      return;
    }

    const todoItem: TodoItem = {
      value: todoText,
      completed: false,
    };

    addTodoItem(todoList, inputField, todoItem);
  }
});

function addTodoItem(
  todoList: HTMLUListElement,
  inputField: HTMLInputElement,
  todoItem: TodoItem
): void {
  const listItem = document.createElement("li");
  listItem.innerText = todoItem.value;
  todoList.appendChild(listItem);
  listItem.appendChild(addButtonsToTodoItem());
  todoList.appendChild(document.createElement("hr"));
  inputField.value = "";
  numberOfTodos++;
  calculatePercentageIncomplete();
}

function checkInputValidity(input: string): boolean {
  return input.length > 0;
}

function createDeleteButton(): HTMLButtonElement {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", deleteTodo);

  return deleteButton;
}

function deleteTodo(event: Event): void {
  const target = event.target as HTMLButtonElement;
  const listItem = target.closest("li") as HTMLLIElement;
  if (listItem) {
    listItem.nextElementSibling?.remove();
    listItem.remove();
    numberOfTodos--;
    calculatePercentageIncomplete();
  } else {
    console.error("List item not found");
  }
}

function createCompleteButton(): HTMLButtonElement {
  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.innerText = "Complete";
  completeButton.addEventListener("click", completeTodo);

  return completeButton;
}

function completeTodo(event: Event): void {
  const target = event.target as HTMLButtonElement;
  const listItem = target.closest("li") as HTMLLIElement;
  target.disabled = true;
  numberOfTodos--;
  calculatePercentageIncomplete();
  if (listItem) {
    listItem.style.textDecoration = "line-through";
  } else {
    console.error("List item not found");
  }
}

function addButtonsToTodoItem(): HTMLDivElement {
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";
  buttonGroup.appendChild(createCompleteButton());
  buttonGroup.appendChild(createDeleteButton());
  return buttonGroup;
}

function calculatePercentageIncomplete() {
  document.getElementById(
    "todo-incomplete-percentage"
  )!.innerText = `${percentageCompleted}%`;
}
