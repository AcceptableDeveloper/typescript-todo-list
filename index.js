var percentageCompleted = 0;
var numberOfTodos = 0;
document.addEventListener("DOMContentLoaded", function () {
    var submitButton = document.getElementById("todo-add-button");
    var inputField = document.getElementById("todo-input");
    var todoList = document.getElementById("todo-list");
    submitButton.addEventListener("click", handleAddTodo);
    function handleAddTodo() {
        var todoText = inputField.value;
        if (!checkInputValidity(todoText)) {
            alert("Please enter a valid todo item");
            return;
        }
        var todoItem = {
            value: todoText,
            completed: false,
        };
        addTodoItem(todoList, inputField, todoItem);
    }
});
function addTodoItem(todoList, inputField, todoItem) {
    var listItem = document.createElement("li");
    listItem.innerText = todoItem.value;
    todoList.appendChild(listItem);
    listItem.appendChild(addButtonsToTodoItem());
    todoList.appendChild(document.createElement("hr"));
    inputField.value = "";
    numberOfTodos++;
    calculatePercentageIncomplete();
}
function checkInputValidity(input) {
    return input.length > 0;
}
function createDeleteButton() {
    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteTodo);
    return deleteButton;
}
function deleteTodo(event) {
    var _a;
    var target = event.target;
    var listItem = target.closest("li");
    if (listItem) {
        (_a = listItem.nextElementSibling) === null || _a === void 0 ? void 0 : _a.remove();
        listItem.remove();
        numberOfTodos--;
        calculatePercentageIncomplete();
    }
    else {
        console.error("List item not found");
    }
}
function createCompleteButton() {
    var completeButton = document.createElement("button");
    completeButton.className = "complete-button";
    completeButton.innerText = "Complete";
    completeButton.addEventListener("click", completeTodo);
    return completeButton;
}
function completeTodo(event) {
    var target = event.target;
    var listItem = target.closest("li");
    target.disabled = true;
    numberOfTodos--;
    calculatePercentageIncomplete();
    if (listItem) {
        listItem.style.textDecoration = "line-through";
    }
    else {
        console.error("List item not found");
    }
}
function addButtonsToTodoItem() {
    var buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";
    buttonGroup.appendChild(createCompleteButton());
    buttonGroup.appendChild(createDeleteButton());
    return buttonGroup;
}
function calculatePercentageIncomplete() {
    document.getElementById("todo-incomplete-percentage").innerText = "".concat(percentageCompleted, "%");
}
