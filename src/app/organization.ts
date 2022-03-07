import { Employee, IEmployeeOrgApp } from './interface';

export class EmployeeOrgApp implements IEmployeeOrgApp {
	public ceo: Employee;
	private removeItem: Employee;
	private steps: number = 0;
	private undoRedoStack: Employee[] = [];
	private undoRedoSteps: number = 0;
	constructor(options?: Employee) {
		this.ceo = options;
		this.steps = 0;
		this.undoRedoSteps = 0;
		this.undoRedoSteps = 30;
		this.saveData();
	}

	private updateEmployee(items: Employee[], employeeID: number, nestingKey: string, key: string, updateItem?: Employee): Employee[] {
		items.reduce((value: Employee, item: Employee, index: number): Employee[] | any => {
			if (item.uniqueId === employeeID) {
				if (key == 'remove') {
					this.removeItem = item;
					items.splice(index, 1);

				}
				if (key == 'add' && updateItem) {
					item.subordinates.push(updateItem)
				}
			}
			if (item[nestingKey]) return this.updateEmployee(item[nestingKey], employeeID, nestingKey, key, updateItem)
		}, null)
		return items;
	}
	/**
	 * Moves the employee with employeeID (uniqueId) under a supervisor (another employee) that has supervisorID (uniqueId).
	 * E.g. move Bob (employeeID) to be subordinate of Georgina (supervisorID).
	 *
	 * @function move
	 * @param {number} employeeID - specifies the employeeID (uniqueId)
	 * @param {number} supervisorID - specifies the supervisorID (uniqueId)
	 * @returns {void}
	 */
	public move(employeeID: number, supervisorID: number): void {
		this.ceo.subordinates = [...this.updateEmployee(this.ceo.subordinates, employeeID, 'subordinates', 'remove')];
		this.ceo.subordinates = [...this.updateEmployee(this.ceo.subordinates, supervisorID, 'subordinates', 'add', this.removeItem)];
		this.saveData();
	}

	/**
	 * saved the collection of data.
	 *
	 * @function saveData
	 * @returns {void}
	 */
	private saveData(): void {
		const changeData: string = JSON.stringify(this.ceo);
		if (this.undoRedoStack.length >= this.steps) {
			this.undoRedoStack = this.undoRedoStack.slice(0, this.steps + 1);
		}
		if (this.undoRedoStack.length > 1 &&
			(this.undoRedoStack[this.undoRedoStack.length - 1].toString().trim() === (changeData.toString() as string).trim())) {
			return;
		}
		this.undoRedoStack.push(JSON.parse(changeData));
		this.steps = this.undoRedoStack.length - 1;
		if (this.steps > this.undoRedoSteps) {
			this.undoRedoStack.shift();
			this.steps--;
		}
	}

	/**
	 * Undo last move action.
	 *
	 * @function undo
	 * @returns {void}
	 */
	public undo(): void {
		if (this.steps > 0) {
			this.ceo = this.undoRedoStack[this.steps - 1];
			this.steps--;
			console.log(this.ceo);
		}
	}
	/**
	 * Redo last undone action.
	 *
	 * @function redo
	 * @returns {void}
	 */
	public redo(): void {
		if (this.undoRedoStack[this.steps + 1] != null) {
			this.ceo = this.undoRedoStack[this.steps + 1];
			this.steps++;
			console.log(this.ceo);
		}
	}
}
