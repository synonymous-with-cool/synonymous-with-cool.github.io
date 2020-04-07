// A todo list web app

var todoList = [];
var doneList = [];
var todoListId = "todo-list";
var doneListId = "done-list";
const taskLimit = 25; // the limit to the amount of to-dos

// 'Task' class
class Task {
	constructor(name) {
		this.name = name;

		this.checkBox = document.createElement('input');
		this.checkBox.setAttribute('type', 'checkbox');
		this.checkBox.setAttribute('id', (name+' checkbox'));

		this.listItem = document.createElement("label");
		this.listItem.innerHTML = name;
		this.listItem.setAttribute('id', name);

		this.whitespace = document.createElement('br');
		this.whitespace.setAttribute('id', (name+' whitespace'));
	};
};

// Get user input for a new list item
function getUserInput() {
	let input = document.getElementById("input-box");
	if (!limitsReached()) {
		addListItem(input.value);
		input.value = "";
	} else {
		alert("Too many tasks!")
	}
};

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", getUserInput);

// Handle adding items to list
function addListItem(itemName) {

	if (itemName) {

		let newName = itemName;

		if (todoList.length >= 1) {
			for (let i = 0; i < todoList.length; i++) {
				if (newName === todoList[i].name) {
					newName = itemName + ' #' + (i+2);
				};
			};
		};

		let lsElement = document.getElementById(todoListId);
		let task = new Task(newName.toString());
		// let br = document.createElement("br");
		
		lsElement.appendChild(task.checkBox);
		lsElement.appendChild(task.listItem);
		lsElement.appendChild(task.whitespace);
		task.checkBox.addEventListener('change', () => {
			removeTask(task);
		});
		todoList.push(task);
	} else {
		alert("Please enter a REAL to-do");
	};
};

// Handle removing items from list
function removeTask(task) {
	let idx = todoList.indexOf(task);
	let doneListElem = document.getElementById(doneListId);


	let elemToRemove = document.getElementById(task.name);
	elemToRemove.parentNode.removeChild(elemToRemove);
	
	elemToRemove = document.getElementById(task.name+' checkbox');
	elemToRemove.parentNode.removeChild(elemToRemove);

	elemToRemove = document.getElementById(task.name+' whitespace');
	elemToRemove.parentNode.removeChild(elemToRemove);
	
	let listItem = todoList[idx].listItem;
	listItem.innerHTML = listItem.innerHTML.toString().strike()
	let ws = todoList[idx].whitespace;
	doneListElem.appendChild(listItem);
	doneListElem.appendChild(ws);

	todoList = removeItem(todoList,idx);
	// console.log(todoList.length);
};

function removeItem(list, idx) {
	let newList = [];
	let delIdx;
	for (let i = 0; i < list.length; i++) {
		if (i !== idx) {
			newList.push(list[i]);
		} else {
			delIdx = i;
		};
	};

	delete list[delIdx];

	return newList;
};

// Make sure things don't get out of hand.
function limitsReached() {
	if (todoList.length >= taskLimit) {
		return true;
	} else {
		return false;
	}
}