import express from "express";
import { sequelize } from "./lib/base.js";
import {
  employee,
  department,
  role,
  employeeDepartment,
  employeeRole,
} from "./models/models.js";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Employee Management System Home Page");
});

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[0].id,
  });

  return res.json({ message: "Database seeded!" });
});

async function getEmployeeDepartments(employeeId) {
  let employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });
  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    });
  }
  return departmentData;
}

async function getEmployeeRoles(employeeId) {
  let employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roleData;
  for (let empRole of employeeRoles) {
    roleData = await role.findOne({
      where: { id: empRole.roleId },
    });
  }

  return roleData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);
  return {
    ...employeeData.dataValues,
    department,
    role,
  };
}

async function getEmployeesDetails(employeesData) {
  let employeesDetails = [];
  for (let empData of employeesData) {
    let employeeData = await employee.findOne({
      where: { id: empData.employeeId },
    });
    employeesDetails.push(await getEmployeeDetails(employeeData));
  }
  return employeesDetails;
}

async function fetchEmployees(id, sort_attribute, sort_type) {
  let result;
  let employeesData;
  if (id === undefined) {
    if (sort_attribute === undefined) {
      employeesData = await employee.findAll({});
    } else {
      employeesData = await employee.findAll({
        order: [[sort_attribute, sort_type]],
      });
    }

    let employeesDetails = [];
    for (let empData of employeesData) {
      let employeeDetails = await getEmployeeDetails(empData);
      employeesDetails.push(employeeDetails);
    }

    result = { employees: employeesDetails };
  } else {
    let employeeData = await employee.findOne({ where: { id } });
    if (employeeData === null) {
      result = { employee: null };
    } else {
      let employeeDetails = await getEmployeeDetails(employeeData);
      result = { employee: employeeDetails };
    }
  }

  return result;
}

app.get("/employees", async (req, res) => {
  try {
    let response = await fetchEmployees();
    console.log(response);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await fetchEmployees(id);
    console.log(response);
    if (response.employee === null) {
      return res.status(404).json({ message: `No employee found by ID ${id}` });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

async function getDepartmentEmployees(departmentId) {
  console.log({ departmentId });
  let departmentsEmployees = await employeeDepartment.findAll({
    where: { departmentId },
  });
  if (departmentsEmployees.length === 0) {
    return { employees: [] };
  }
  let employeesDetails = await getEmployeesDetails(departmentsEmployees);
  return { employees: employeesDetails };
}

app.get("/employees/department/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getDepartmentEmployees(id);
    console.log(response);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

async function getRoleEmployees(roleId) {
  console.log({ roleId });
  let roleEmployees = await employeeRole.findAll({
    where: { roleId },
  });
  if (roleEmployees.length === 0) {
    return { employees: [] };
  }
  let employeesDetails = await getEmployeesDetails(roleEmployees);
  return { employees: employeesDetails };
}

app.get("/employees/role/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getRoleEmployees(id);
    console.log(response);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

app.get("/employees/sort-by-name", async (req, res) => {
  try {
    let sort_type = req.query.order;
    let response = await fetchEmployees(undefined, "name", sort_type);
    console.log(response);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
