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
    var listItem = target.parentElement;
    (_a = listItem.nextElementSibling) === null || _a === void 0 ? void 0 : _a.remove();
    listItem.remove();
}
function createCompleteButton() {
    var completeButton = document.createElement("button");
    completeButton.className = "complete-button";
    completeButton.innerText = "Complete";
    completeButton.addEventListener("click", completeTodo);
    return completeButton;
}
function completeTodo() {
    // Add your code here
}
function addButtonsToTodoItem() {
    var buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";
    buttonGroup.appendChild(createCompleteButton());
    buttonGroup.appendChild(createDeleteButton());
    return buttonGroup;
}
