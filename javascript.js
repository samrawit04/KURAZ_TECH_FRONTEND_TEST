let tasks = [];

    function renderTasks() {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
          <span onclick="toggleTask(${task.id})" style="cursor: pointer;">${task.title}</span>
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const input = document.getElementById('new-task');
      const title = input.value.trim();
      if (title) {
        const newTask = {
          id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
          title: title,
          completed: false
        };
        tasks.push(newTask);
        input.value = '';
        renderTasks();
      }
    }

    function toggleTask(id) {
      tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      renderTasks();
    }

    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }

    document.getElementById('new-task').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });

    renderTasks();
