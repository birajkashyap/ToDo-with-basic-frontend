document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load saved todos from local storage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoItem(todo.text, todo.completed));

    todoForm.addEventListener('submit', event => {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            saveTodos();
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', event => {
        if (event.target.tagName === 'BUTTON') {
            event.target.parentElement.remove();
            saveTodos();
        } else if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            saveTodos();
        }
    });

    function addTodoItem(text, completed = false) {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) {
            li.classList.add('completed');
        }
        const button = document.createElement('button');
        button.textContent = 'Delete';
        li.appendChild(button);
        todoList.appendChild(li);
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.childNodes[0].textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
