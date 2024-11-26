const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { DefaultSerializer } = require('v8');

const app = express();
app.use(cors());
const port = 3000;

// ======================= Endpoints Below =======================
// start node app: node index.js

function getHomeMessage() {
  return 'This is Home Page of AirFlow.';
}

app.get('/', (req, res) => {
  res.send(getHomeMessage());
});

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function taskAdd(taskLlist, object) {
  taskLlist.push(object);
  return taskLlist;
}

function createTaskObject(taskId, text, priority) {
  return { taskId: taskId, text: text, priority: priority };
}

// /tasks/add?taskId=34&text=this+is+my+house+number&priority=0
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let newObject = createTaskObject(taskId, text, priority);
  let newTaskList = taskAdd(tasks.slice(), newObject);
  res.json({ tasks: newTaskList });
});

function createTaskObject(taskId, text, priority) {
  return { taskId: taskId, text: text, priority: priority };
}
// /tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

function sortTasks(attribute, task1, task2) {
  return task1[attribute] - task2[attribute];
}

// /tasks/sort-by-priority
app.get('/tasks/sort-by-priority', (req, res) => {
  let sortedTasks = tasks.sort((task1, task2) =>
    sortTasks('priority', task1, task2)
  );
  res.json({ tasks: sortedTasks });
});

function taskUpdate(tasksList, taskId, priority, text) {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i]['taskId'] == taskId) {
      // if priority is -1, updating the text
      if (priority == -1) {
        tasksList[i]['text'] = text;
        // else, updating the priority
      } else {
        tasksList[i]['priority'] = priority;
      }
    }
  }
  return tasksList;
}

// /tasks/edit-priority?taskId=1&priority=101
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let newTaskList = taskUpdate(tasks.slice(), taskId, priority, 'None');
  res.json({ tasks: newTaskList });
});

// /tasks/edit-text?taskId=1&text=himanshu+khairajani
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let newTaskList = taskUpdate(tasks.slice(), taskId, -1, text);
  res.json({ tasks: newTaskList });
});

function filterTask(taskElement, attribute, taskId, type = 'keep') {
  if (type == 'keep') {
    return taskElement[attribute] == taskId;
  } else if (type == 'delete') {
    return taskElement[attribute] != taskId;
  }
}
// /tasks/delete?taskId=1
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let newTaskList = tasks.filter((task) =>
    filterTask(task, 'taskId', taskId, 'delete')
  );
  res.json({ tasks: newTaskList });
});

// /tasks/filter-by-priority?priority=1
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let newTaskList = tasks.filter((task) =>
    filterTask(task, 'priority', priority, 'keep')
  );
  res.json({ tasks: newTaskList });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
