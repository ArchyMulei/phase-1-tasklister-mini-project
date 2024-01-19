document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('create-task-form')
  const taskList = document.getElementById('tasks')
  const priorityDropdown = document.createElement('select')
  const sortDropdown = document.createElement('select')
  const priorityOptions = {
    High: 'red',
    Medium: 'yellow',
    Low: 'green'
  };
  let tasks = []

  // Add event listener for form submission
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const taskInput = document.getElementById('new-task-description')
    const taskDescription = taskInput.value
    const priority = priorityDropdown.value

    if (taskDescription !== '') {
      const taskItem = createTaskItem(taskDescription, priority)
      tasks.push({ description: taskDescription, priority: priority })
      taskList.appendChild(taskItem);
      taskInput.value = ''
    }
  });

  // Create task item element
  function createTaskItem(description, priority) {
    const taskItem = document.createElement('tr');
  
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;
    taskItem.appendChild(descriptionCell);
  
    const priorityCell = document.createElement('td');
    if (priority !== 'None') {
      priorityCell.style.color = priorityOptions[priority];
    }
    priorityCell.textContent = priority;
    taskItem.appendChild(priorityCell);
  
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); // Add the delete button class
    deleteButton.addEventListener('click', () => deleteTask(taskItem));
    actionCell.appendChild(deleteButton);
    taskItem.appendChild(actionCell);
  
    return taskItem;
  }

  // Delete a task
  function deleteTask(taskItem) {
    tasks = tasks.filter((task) => task.description !== taskItem.textContent)
    taskItem.remove()
  }

  // Add priority dropdown
  for (const option in priorityOptions) {
    const priorityOption = document.createElement('option')
    priorityOption.textContent = option
    priorityDropdown.appendChild(priorityOption)
  }
  taskForm.insertBefore(priorityDropdown, taskForm.lastElementChild)

  // Add sort dropdown
  const sortOptions = ['None', 'Ascending', 'Descending']
  sortOptions.forEach((option) => {
    const sortOption = document.createElement('option')
    sortOption.textContent = option
    sortDropdown.appendChild(sortOption)
  });
  taskForm.insertBefore(sortDropdown, taskForm.lastElementChild)

  // Sort tasks based on priority
  sortDropdown.addEventListener('change', () => {
    const sortedTasks = sortTasks(tasks, sortDropdown.value)
    clearTaskList()
    sortedTasks.forEach((task) => {
      const taskItem = createTaskItem(task.description, task.priority)
      taskList.appendChild(taskItem)
    });
  });

  // Helper function to sort tasks
  function sortTasks(tasks, sortOrder) {
    const sortedTasks = [...tasks]
    if (sortOrder === 'Ascending') {
      sortedTasks.sort((a, b) => a.priority.localeCompare(b.priority))
    } else if (sortOrder === 'Descending') {
      sortedTasks.sort((a, b) => b.priority.localeCompare(a.priority))
    }
    return sortedTasks;
  }

  // Helper function to clear task list
  function clearTaskList() {
    while (taskList.firstChild) {
      taskList.firstChild.remove()
    }
  }
});