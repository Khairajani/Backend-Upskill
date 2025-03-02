const employees = [
    { id: 1, name: "John Doe", position: "Software Engineer", department: "Engineering" },
    { id: 2, name: "Jane Smith", position: "Product Manager", department: "Product" },
    { id: 3, name: "Michael Johnson", position: "UX Designer", department: "Design" },
    { id: 4, name: "Emily Williams", position: "Data Scientist", department: "Analytics" },
    { id: 5, name: "Robert Brown", position: "Marketing Specialist", department: "Marketing" }
  ];
  
/**
 * Get employees based on ID
 * @param {number|undefined} id - Employee ID to search for
 * @returns {Array|Object|null} - Returns all employees, a specific employee, or null
 */
async function getEmployees(id) {
    if (id === undefined) {
        if (employees.length === 0) return null;
        return employees;
    }
    const employee = employees.find(emp => emp.id === id);
    return employee || null;
}

module.exports = {getEmployees}