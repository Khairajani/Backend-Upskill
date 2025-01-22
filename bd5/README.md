# ManageEase: Employee Management System

## Overview
This project is an **Employee Management System backend** developed using **Node.js**, **Express**, and **Sequelize** ORM. The system supports core functionalities like CRUD operations, sorting, filtering, and associations between employees, departments, and roles.


## 🚀 Helper Functions
The backend includes helper functions and endpoints to manage employee records, including their roles and departments, with efficient database interactions.

- getEmployeeDepartments(employeeId): Fetches department details for a given employee.
- getEmployeeRoles(employeeId): Fetches role details for a given employee.
- getEmployeeDetails(employeeData): Combines data from the above functions to return complete employee details.

---

## 📜 Features
1. **CRUD Operations**: Create, Read, Update, and Delete employees.
2. **Associations**: Manage relationships between employees, departments, and roles.
3. **Sorting and Filtering**: Fetch employees based on specific criteria (e.g., department, role) or sort results by name.
4. **Database Seeding**: Prepopulate the database with sample data for testing and demonstration purposes.


---

## Prerequisites
- Node.js (>=14.x)
- Sequelize
- PostgreSQL, MySQL, or SQLite (any Sequelize-supported database)
- npm or yarn


---

## 📘 API Endpoints

### 1. **Get All Employees**
**Endpoint**: `/employees`  
**Method**: `GET`  
**Description**: Fetches all employees with their associated departments and roles.

---

### 2. **Get Employee by ID**
**Endpoint**: `/employees/details/:id`  
**Method**: `GET`  
**Description**: Fetches details of an employee by ID, including their department and role.

---

### 3. **Get Employees by Department**
**Endpoint**: `/employees/department/:departmentId`  
**Method**: `GET`  
**Description**: Fetches employees belonging to a specific department.

---

### 4. **Get Employees by Role**
**Endpoint**: `/employees/role/:roleId`  
**Method**: `PUT`  
**Description**: Fetches employees with a specific role.


---

### 5. **Get Employees Sorted by Name**
**Endpoint**: `/employees/sort-by-name`  
**Method**: `GET`  
**Description**: Fetches employees sorted by their names.

**Query Parameters**:
- `order` (string): Sorting type: `asc` or `desc` 

---

### 6. **Add a New Employee**
**Endpoint**: `/employees/new`  
**Method**: `POST`  
**Description**: Adds a new employee to the system.

**Request Body**: 
{
  "name": "Karan Mehta",
  "email": "karan.mehta@example.com",
  "departmentId": 1,
  "roleId": 1
}

---

### 7. **Update Employee Details**
**Endpoint**: `/employees/update/:id`  
**Method**: `POST`  
**Description**: Updates details of an existing employee.
**Request Body**: 
{
  "email": "karan.m@example.com"
}


---

## 🚀 Getting Started

1. Clone this repository.
2. Set up the environment with necessary dependencies.
3. Use the provided API endpoints for seamless integration into your frontend.

---

## 🛠️ Tech Stack

- **Backend**: RESTful API build in Express.js
- **Programming Language**: JavaScript
- **Database**: sqlite

---

## 🌟 Contributions

We welcome contributions! Feel free to fork this repository and submit a pull request to improve the codebase or add features.

---

## 📞 Support

For queries or support, please contact us at:  
**Email**: support@manageeasy.com
**Phone**: +91-7**56\*\***8

Stay organized with Employee Management System 📝✨