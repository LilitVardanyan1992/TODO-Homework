"use strict";

// TASKS
// 1. Լուծում եք ID-ների խնդիրը
// 2․ Լուծում եք clearAll Finished-ի խնդիրը
// 3․ լուծում եք localStorage—ի խնդիրը
// 4․ Նույնը փորձում եք TS-ով

window.addEventListener("load", () => {
    const todoForm = document.querySelector("#todo-form form");
    const todoList = document.querySelector("#todo-list");
    const todoBottom = document.querySelector("#todo-bottom");
    const clearFinishedTodos = todoBottom.querySelector(
        "[data-clear-all-finished]"
    );

    let i = 0;

    let data = [];

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.firstElementChild.value;

        if (value !== "") {
            data.push({
                id: data.length === 0 ? 0 : i,
                text: value,
                isCompleted: false,
            });
            data[0].id === 0 && data.length === 1 ? (i = 0) : i++;
            e.target.reset();
            todoList.innerHTML = "";
            createTodoListItem(data);
            checkTodoListItemsLength(data);
        }
    });

    clearFinishedTodos.addEventListener("click", clearAllfinished);

    function createTodoListItem(data) {
        for (let i = 0; i < data.length; i++) {
            const { id, text, isCompleted } = data[i];
            todoList.innerHTML += `
				<div
					class="todo-list-item"
					data-id=${id}
				>
					<label>
						<input
							type="checkbox"
							${isCompleted ? "checked" : ""}
							data-completed
						>
						<span>${text}</span>
					</label>
					<button data-rm>Remove</button>
				</div>
			`;

            removeTodoListItem(document.querySelectorAll("[data-rm]"));
            checkTodoListItemsCompleted(
                document.querySelectorAll("[data-completed]")
            );
        }
    }

    function removeTodoListItem(removeBtnArr) {
        for (let x = 0; x < removeBtnArr.length; x++) {
            removeBtnArr[x].addEventListener("click", () => {
                const itemId = parseInt(
                    removeBtnArr[x].parentElement.dataset.id
                );
                const dataIndex = data.findIndex((item) => item.id === itemId);

                if (dataIndex !== -1) {
                    removeBtnArr[x].parentElement.remove();
                    data.splice(dataIndex, 1);
                    checkTodoListItemsLength(data);
                    checkTodoListItemsLengthforComleted(data);
                }
            });
        }
    }

    function checkTodoListItemsLength(data) {
        todoBottom.querySelector("#all_todos_count").textContent = data.length;
    }

    function checkTodoListItemsCompleted(checkboxInputsArr) {
        checkboxInputsArr.forEach((input, index) => {
            input.addEventListener("change", (e) => {
                if (e.target.checked) {
                    data[index].isCompleted = true;
                    console.log(data);
                } else {
                    data[index].isCompleted = false;
                    console.log(data);
                }

                const count = data.filter(
                    (object) => object.isCompleted
                ).length;
                todoBottom.querySelector("#finished_todos_count").textContent =
                    count;
            });
        });
    }

    function clearAllfinished() {
        console.log(data);
        const filteredData = data.filter((todo) => !todo.isCompleted);
        data = filteredData;

        todoList.innerHTML = "";
        document.querySelector("#finished_todos_count").textContent = 0;
        createTodoListItem(data);
        checkTodoListItemsLength(data);
    }
});
