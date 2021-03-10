let listCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('create-task-form').addEventListener('submit', event => {
    event.preventDefault();

    const taskList = document.getElementById('tasks');
    const task = document.getElementById('new-task-description').value;
    const newTask = document.createElement('li');

    newTask.id = `list-${listCount}`;
    newTask.setAttribute('priority', document.getElementById('priority').value)

    setTaskColor(document.getElementById('priority').value, newTask);
   
    // const deleteButton = document.createElement('button');
    // deleteButton.setAttribute('type', 'submit');
    // deleteButton.textContent = 'X';
    // newTask.appendChild(task);
    // newTask.appendChild(deleteButton);
   
    newTask.innerHTML = `${task} <button id='delete-${listCount}' type='submit'>X</button>`;
    taskList.appendChild(newTask);
   
    const listElement = document.getElementById(`delete-${listCount}`);
    listElement.addEventListener('click', () => {
      document.getElementById(`list-${listElement.id.slice(-1)}`).remove();
      listCount--;
    });

    // const allTasks = document.getElementById('tasks').getElementsByTagName('li');
    let tasksArray = [];
    Array.from(document.querySelectorAll('#tasks>li'), li => tasksArray.push({
      id: li.id, 
      innerHTML: li.innerHTML, 
      priority: li.getAttribute('priority')
    }));
    tasksArray.sort((task1, task2) => task2.priority - task1.priority);
    console.log(tasksArray);
    // console.log(tasksArray.sort((task1, task2) => task1.getAttribute('priority') - task2.getAttribute('priority')));

    // allTasks.sort((taskOne, taskTwo) => taskOne.priority - taskTwo.priority);
    // console.log(allTasks);

    // document.getElementById('tasks').appendChild(deleteButton);     
    
    document.getElementById('new-task-description').value = '';
    listCount++;
  });
});

const setTaskColor = (value, task) => {
  switch(value) {
    case '1': task.style.color = 'green'; break;
    case '2': task.style.color = 'yellow'; break;
    case '3': task.style.color = 'red'; break;
  };
};