import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service'

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

	// Define my inital variables
	tasks: any = []
	task: any = {task: '', complete: false}
	error: string = 'Task cannot be empty and can only container at least 2 characters!'
	success: string = ''

	// Instantiat my imported service
	constructor(private todo: TodoService) { }

	// Load tasks on load
	load(){
		console.log("\nGetting all tasks...");
		this.todo.getTasks().subscribe(res => {
			this.tasks = res
			}
		);
	}

	// On load
	ngOnInit(): void {
		this.load()
	}

	// Adding a task
	submit(formTask: any){
		if (formTask.form.value.task.trim().length < 1 && typeof formTask.form.value.task === "string") {
			console.log("\nAdding", formTask.form.value.task, "to tasks...");
			// this.task.task = formTask.form.value.task
			// this.todo.addTask(this.task).subscribe(res => {
			// 		res
			// 	}
			// )
		}else{
			console.log(this.error);
			console.log(formTask.form);
			console.log(typeof formTask.form.controls.task.value);
			console.log(typeof formTask.form.value.task);
			
		}
		this.load()
	}

	// Mark task as complete
	complete(formTask: any){
		console.log("\nGetting", formTask.task, "from tasks...");

		console.log("Updating", formTask.task, "status...");
		formTask.complete = !formTask.complete
		this.todo.updateTask(formTask).subscribe(res => {
			res
		})	
	}

	update(formTask: any){
		console.log("\nGetting", formTask.task, "from tasks...");

		console.log("\nUpdating", formTask.task);
		this.todo.updateTask(formTask)
	}

	// Removing a task
	remove(formTask: any){
		console.log("\nGetting", formTask.task, "from tasks...");

		console.log("\nRemoving", formTask.task, "from tasks...");
		this.todo.removeTask(formTask).subscribe(res => {
			console.log(res);
		})
		this.load()
	}
}
