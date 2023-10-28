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
	let i = 0;

	const data = [];

	todoForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const value = e.target.firstElementChild.value;

		if (value !== "") {
			data.push({
				id: i, text: value, isCompleted: false
			});
			i++;
			e.target.reset();
			todoList.innerHTML = "";
			createTodoListItem(data);
			checkTodoListItemsLength(data);
		}
	});

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
			checkTodoListItemsCompleted(document.querySelectorAll("[data-completed]"));
		}
	}

	function removeTodoListItem(removeBtnArr) {
		for (let x = 0; x < removeBtnArr.length; x++) {
			removeBtnArr[x].addEventListener("click", () => {
				if (parseInt(removeBtnArr[x].parentElement.dataset.id) === x) {
					removeBtnArr[x].parentElement.remove();
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
				} else {
					data[index].isCompleted = false;
				}

				const count = data.filter(object => object.isCompleted).length;
				todoBottom.querySelector("#finished_todos_count").textContent = count;
			});
		});
	}
});