import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	url = 'http://127.0.0.1:8000/api'

	constructor(private http: HttpClient) { }

	// Get all tasks from an api
	getTasks(){
		return this.http.get(`${this.url}/tasks`)
	}

	// Adding a task to an api
	addTask(task: any){
		return this.http.post(`${this.url}/add`, task)
	}

	// Getting a task from an api
	getTask(task: any){
		return this.http.get(`${this.url}/task/${task.id}`)
	}

	// Updating a task from an api
	updateTask(task: any){
		return this.http.put(`${this.url}/task/${task.id}`, task)
	}

	// Removing a task from an api
	removeTask(task: any){
		return this.http.delete(`${this.url}/task/${task.id}`)
	}
}
