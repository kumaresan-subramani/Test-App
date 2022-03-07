export interface Employee {
	uniqueId: number;
	name: string;
	subordinates: Employee[];
  }
  
  export interface IEmployeeOrgApp {
	ceo: Employee | { [key: string]: Object };
	move(employeeID: number, supervisorID: number): void;
	undo?(): void;
	redo?(): void;
  }
  