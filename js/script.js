"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.querySelector("#todo-form form");
    const todoList = document.querySelector("#todo-list");
    const todoBottom = document.querySelector("#todo-bottom");
    const clearFinishedTodos = todoBottom.querySelector(
        "[data-clear-all-finished]"
    );

    let data = [];

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.firstElementChild.value;
        todoList.append(createSingleTodoComponent(value));
        e.target.reset();
    });

    clearFinishedTodos.addEventListener("click", clearAllfinished);

    function createSingleTodoComponent(text) {
        const id = crypto.randomUUID();

        const singleTodo = {
            id,
            text,
            isCompleted: false,
        };
        data.push(singleTodo);

        const singleTodoElement = document.createElement("div");
        singleTodoElement.classList.add("todo-list-item");
        singleTodoElement.setAttribute("data-id", `${id}`);

        singleTodoElement.innerHTML = `
                <label>
                    <input
                        type="checkbox"
                        ${singleTodo.isCompleted ? "checked" : ""}
                        data-completed
                    >
                    <span>${text}</span>
                </label>
                <button class="remove-single-todo" data-rm=${id}>Remove</button>
            `;

        const checkboxInput = singleTodoElement.querySelector(
            "input[type=checkbox][data-completed]"
        );
        if (checkboxInput) {
            checkTodoListItemsCompleted(checkboxInput, id);
        }

        removeTodoListItem(singleTodoElement);
        updateState();

        return singleTodoElement;
    }

    function updateState() {
        todoBottom.querySelector("#all_todos_count").textContent = data.length;
        todoBottom.querySelector("#finished_todos_count").textContent =
            data.filter((object) => object.isCompleted).length;
    }

    function removeTodoListItem(element) {
        element.addEventListener("click", (e) => {
            if (e.target.matches(".remove-single-todo")) {
                let itemId = e.target.dataset.rm;
                e.target.parentElement.remove();

                data = data.filter((item) => item.id !== itemId);
                updateState();
            }
        });
    }

    function checkTodoListItemsCompleted(checkboxInput) {
        checkboxInput.addEventListener("change", (e) => {
            const itemId = e.target.parentElement.parentElement.dataset.id;
            const dataIndex = data.findIndex((item) => item.id === itemId);
            const todoListItems = todoList.querySelectorAll(".todo-list-item");
            let todoListItemIndex;

            for (let i = 0; i < todoListItems.length; i++) {
                if (todoListItems[i].dataset.id === itemId) {
                    todoListItemIndex = i;
                }
            }

            if (e.target.checked) {
                data[dataIndex].isCompleted = true;
                todoListItems[todoListItemIndex]
                    .querySelector("input[type=checkbox][data-completed]")
                    .setAttribute("checked", "checked");
            } else {
                data[dataIndex].isCompleted = false;
                todoListItems[todoListItemIndex]
                    .querySelector("input[type=checkbox][data-completed]")
                    .removeAttribute("checked");
            }

            updateState();
        });
    }

    function clearAllfinished() {
        data = data.filter((todo) => !todo.isCompleted);
        const todoListItems = todoList.querySelectorAll(".todo-list-item");

        for (let i = 0; i < todoListItems.length; i++) {
            if (
                todoListItems[i]
                    .querySelector("input[type=checkbox][data-completed]")
                    .hasAttribute("checked")
            ) {
                todoListItems[i].remove();
            }
        }

        updateState();
    }
});
