# AirFlow Task Management System

Welcome to the **AirFlow Task Management System**, a platform designed to help users effectively manage tasks with functionalities to add, edit, delete, sort, and filter tasks by priority.

---

## 📜 Features

- **Add Tasks**: Create new tasks with unique IDs, descriptions, and priorities.
- **Edit Tasks**: Update task descriptions or priorities.
- **Delete Tasks**: Remove tasks from the list.
- **Read Tasks**: View all existing tasks.
- **Sort Tasks**: Organize tasks by priority.
- **Filter Tasks**: Retrieve tasks matching a specific priority.

---

## 📘 API Endpoints

### 1. **Add a Task**
**Endpoint**: `/tasks/add`  
**Method**: `POST`  
**Description**: Add a new task to the task list using the provided details.

**Query Parameters**:
- `taskId` (integer): The ID of the task.
- `text` (string): The description of the task.
- `priority` (integer): The priority of the task.

---

### 2. **Read All Tasks**
**Endpoint**: `/tasks`  
**Method**: `GET`  
**Description**: Retrieve the current list of tasks.

---

### 3. **Sort Tasks by Priority**
**Endpoint**: `/tasks/sort-by-priority`  
**Method**: `GET`  
**Description**: Sort tasks by their priority in ascending order.

---

### 4. **Edit Task Priority**
**Endpoint**: `/tasks/edit-priority`  
**Method**: `PUT`  
**Description**: Update the priority of an existing task based on its ID.

**Query Parameters**:
- `taskId` (integer): The ID of the task.
- `priority` (integer): The new priority of the task.

---

### 5. **Edit/Update Task Text**
**Endpoint**: `/tasks/edit-text`  
**Method**: `PUT`  
**Description**: Update the text/description of an existing task based on its ID.

**Query Parameters**:
- `taskId` (integer): The ID of the task.
- `text` (string): The new description of the task.

---

### 6. **Delete a Task**
**Endpoint**: `/tasks/delete`  
**Method**: `DELETE`  
**Description**: Remove a task from the task list based on its ID.

**Query Parameters**:
- `taskId` (integer): The ID of the task to be deleted.

---

### 7. **Filter Tasks by Priority**
**Endpoint**: `/tasks/filter-by-priority`  
**Method**: `GET`  
**Description**: Retrieve tasks that match a specific priority.

**Query Parameters**:
- `priority` (integer): The priority to filter tasks by.

---

## 🚀 Getting Started

1. Clone this repository.
2. Set up the environment with necessary dependencies.
3. Use the provided API endpoints for seamless integration into your frontend.

---

## 🛠️ Tech Stack

- **Backend**: RESTful API build in Express.js
- **Programming Language**: JavaScript
- **Database**: NA

---

## 🌟 Contributions

We welcome contributions! Feel free to fork this repository and submit a pull request to improve the codebase or add features.

---

## 📞 Support

For queries or support, please contact us at:  
**Email**: support@airflow.com
**Phone**: +91-7**56\*\***8

Stay organized with AirFlow Task Management System! 📝✨