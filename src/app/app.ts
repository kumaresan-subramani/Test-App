import { EmployeeOrgApp } from "./organization";
import { Employee, IEmployeeOrgApp } from "./interface";
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
    { uniqueId: 13, name: "Georgina Flangy", subordinates: [] }]
};

const employeeOrg: IEmployeeOrgApp = new EmployeeOrgApp(ceo);

//Initialize TreeView component
let treeViewInstance: TreeView = new TreeView({
  fields: {
    dataSource: [employeeOrg.ceo as { [key: string]: Object }],
    id: "uniqueId",
    text: "name",
    child: "subordinates",
  },
  nodeTemplate: '#treeTemplate',
});

//Render initialized TreeView
treeViewInstance.appendTo("#tree");
treeViewInstance.expandAll();

let addFormObj: FormValidator = new FormValidator("#addForm");

document.getElementById("add").onclick = (): void => {
  var employee = parseInt((document.getElementById("Employee") as any).value);
  var supervisor = parseInt((document.getElementById("Supervisor") as any).value);
  employeeOrg.move(employee, supervisor);
  treeViewInstance.fields.dataSource = [employeeOrg.ceo as { [key: string]: Object }];
  treeViewInstance.dataBind();
  treeViewInstance.expandAll();
  addFormObj.reset();
};

document.getElementById("undo").onclick = (): void => {
  employeeOrg.undo();
  treeViewInstance.fields.dataSource = [employeeOrg.ceo as { [key: string]: Object }];
  treeViewInstance.dataBind();
  treeViewInstance.expandAll();
  addFormObj.reset();
};

document.getElementById("Redo").onclick = (): void => {
  employeeOrg.redo();
  treeViewInstance.fields.dataSource = [employeeOrg.ceo as { [key: string]: Object }];
  treeViewInstance.dataBind();
  treeViewInstance.expandAll();
  addFormObj.reset();
};

document
  .getElementById("addForm")
  .addEventListener("submit", (e: Event) => e.preventDefault());
