import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

	// Instantiate the TodoService
	constructor(private _todo: TodoService) { }

	// Initialization
	tasks: any = [];
	task: any = {}
	update_task: any = false

	// Task Form
	taskForm: any = new FormGroup({
		task: new FormControl(''),
		complete: new FormControl(false)
	});

	ngOnInit(): void {
		this.load()
	}

	// Loading all the tasks
	load(){
		this._todo.getTasks().subscribe((tasks: any) => {
			this.tasks = tasks
			this.taskForm.reset()
			this.update_task = false
		})
	}

	// Adding a new task
	submit(taskForm: any){
		this.taskForm.controls.complete.setValue(false);
		this._todo.addTask(taskForm.value).subscribe((res: any) => {
			this.load()
		})
	}

	// Mark task as complete or incomplete
	complete(task: any){
		this._todo.getTask(task).subscribe((task_get: any) => {
			task_get.complete = !task_get.complete
			this._todo.updateTask(task_get).subscribe((task_update: any) => {
				this.load()
			})
		})
	}

	// Get task to update and asign the response to this.task
	get_task(task: any){
		this._todo.getTask(task).subscribe((res: any) => {
			this.task = res
			this.taskForm.controls.task.setValue(res.task);
			this.update_task = true
		})
	}

	// Update the task with data from the form
	update(taskForm: any){
		this.task.task = taskForm.value.task
		this._todo.updateTask(this.task).subscribe((res: any) => {
			this.load()
		})
	}

	// Remove task by id
	remove(task: any){
		this._todo.getTask(task).subscribe((task_get: any) => {
			this._todo.removeTask(task).subscribe((res: any) => {
				this.load()
			})
		})
	}
}
