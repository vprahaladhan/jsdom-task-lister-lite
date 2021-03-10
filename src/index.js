let listCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('create-task-form').addEventListener('submit', event => {
    event.preventDefault();

    const taskList = document.getElementById('tasks');
    const task = document.getElementById('new-task-description').value;
    const duration = document.getElementById('new-task-duration').value;
    const dueDate = document.getElementById('new-task-due-date').value;

    const newTask = document.createElement('li');
    newTask.id = `list-${listCount}`;
    newTask.setAttribute('priority', document.getElementById('priority').value)
    newTask.innerHTML = `${task} ${duration} ${dueDate} <button id='delete-${listCount}' type='submit'>X</button>`;
    setTaskPriority(document.getElementById('priority').value, newTask);
    taskList.appendChild(newTask);
   
    const listElement = document.getElementById(`delete-${listCount}`);
    listElement.addEventListener('click', () => {
      document.getElementById(`list-${listElement.id.slice(-1)}`).remove();
      listCount--;
    });
    
    document.getElementById('new-task-description').value = '';
    document.getElementById('new-task-duration').value = '';
    document.getElementById('new-task-due-date').value = '';
    listCount++;
  });
});

const setTaskPriority = (value, task) => {
  switch(value) {
    case '1': {
      task.style.color = 'green'; 
      task.priority = 1;
      break;
    };
    case '2': {
      task.style.color = 'yellow'; 
      task.priority = 2;
      break;
    }
    case '3': {
      task.style.color = 'red'; 
      task.priority = 3;
      break;
    }
  };
};

document.getElementById('sort').addEventListener('change', event => {
  switch(event.target.value) {
    case '0': break;
    case '1': sortTasks('ascending');  break;
    case '2': sortTasks('descending'); break;
  }
});

const sortTasks = sortOrder => {
  let tasksArray = Array.from(document.querySelectorAll('#tasks>li')).sort((task1, task2) => {
    return sortOrder === 'ascending' ? task1.priority - task2.priority : task2.priority - task1.priority; 
  });

  while (document.getElementById('tasks').firstChild) {
    document.getElementById('tasks').firstChild.remove();
  }
  
  tasksArray.forEach(task => document.getElementById('tasks').appendChild(task));
};