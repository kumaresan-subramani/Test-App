import { EmployeeOrgApp } from "../../component/organization";
import { Employee, IEmployeeOrgApp } from "../../component/interface";
import { FormValidator } from "@syncfusion/ej2-inputs";
import { TreeView } from "@syncfusion/ej2-navigations";

export const ceo: Employee = {
  uniqueId: 1,
  name: "Mark ",
  subordinates: [
    { uniqueId: 2, name: "Cassandra Reynolds", subordinates: [] },
    { uniqueId: 3, name: "Mary Blue", subordinates: [] },
    { uniqueId: 4, name: "Bob Saget", subordinates: [] },
    { uniqueId: 5, name: "Tina Teff", subordinates: [] },
    { uniqueId: 6, name: "Will Turner", subordinates: [] },
    { uniqueId: 7, name: "Tyler Simpson", subordinates: [] },
    { uniqueId: 8, name: "Harry Tobs", subordinates: [] },
    { uniqueId: 9, name: "Thomas Brown", subordinates: [] },
    { uniqueId: 10, name: "George Carrey", subordinates: [] },
    { uniqueId: 11, name: "Gary Styles", subordinates: [] },
    { uniqueId: 12, name: "Bruce Willis", subordinates: [] },
    { uniqueId: 13, name: "Georgina Flangy", subordinates: [] }],

};

const employeeOrg: IEmployeeOrgApp = new EmployeeOrgApp(ceo);

/* Example Reference
employeeOrg.move(10, 9);
console.log('move', employeeOrg.ceo);
employeeOrg.undo();
console.log('undo', employeeOrg.ceo);
employeeOrg.redo();
console.log('redo', employeeOrg.ceo);
*/

//Initialize TreeView component
let treeViewInstance: TreeView = new TreeView({
  fields: {
    dataSource: [ceo as any],
    id: "uniqueId",
    text: "name",
    child: "subordinates",
  },
});

//Render initialized TreeView
treeViewInstance.appendTo("#tree");
treeViewInstance.expandAll();

let addFormObj: FormValidator = new FormValidator("#addForm");

document.getElementById("add").onclick = (): void => {
  var employee = parseInt((document.getElementById("Employee") as any).value);
  var supervisor = parseInt((document.getElementById("Supervisor") as any).value);
  employeeOrg.move(employee, supervisor);
  treeViewInstance.refresh();
  treeViewInstance.expandAll();
  addFormObj.reset();
};

document.getElementById("undo").onclick = (): void => {
  employeeOrg.undo();
};

document.getElementById("Redo").onclick = (): void => {
  employeeOrg.redo();
};

document
  .getElementById("addForm")
  .addEventListener("submit", (e: Event) => e.preventDefault());
