import { DataTypes, sequelize } from "../lib/base.js";

let department = sequelize.define("department", {
  name: DataTypes.STRING,
});

let role = sequelize.define("role", {
  title: DataTypes.STRING,
});

let employee = sequelize.define("employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

let employeeDepartment = sequelize.define("employee_department", {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "id",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: department,
      key: "id",
    },
  },
});

let employeeRole = sequelize.define("employee_role", {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "id",
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: role,
      key: "id",
    },
  },
});

// Employee belongs to many Departments through EmployeeDepartment
employee.belongsToMany(department, {
  through: employeeDepartment,
});

// Department belongs to many Employees through EmployeeDepartment
department.belongsToMany(employee, {
  through: employeeDepartment,
});

// Employee belongs to many Roles through EmployeeRole
employee.belongsToMany(role, {
  through: employeeRole,
});

// Role belongs to many Employees through EmployeeRole
role.belongsToMany(employee, {
  through: employeeRole,
});

export { department, role, employee, employeeDepartment, employeeRole };
