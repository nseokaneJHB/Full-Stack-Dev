import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private _http: HttpClient) { }

	url = 'http://127.0.0.1:8000/api'

	// Get all tasks from an api
	getTasks(){
		return this._http.get(`${this.url}/tasks`)
	}

	// Adding a task to an api
	addTask(task: any){
		return this._http.post(`${this.url}/tasks/`, task)
	}

	// Getting a task from an api
	getTask(task: any){
		return this._http.get(`${this.url}/task/${task.id}/`)
	}

	// Updating a task from an api
	updateTask(task: any){
		return this._http.put(`${this.url}/task/${task.id}/`, task)
	}

	// Removing a task from an api
	removeTask(task: any){
		return this._http.delete(`${this.url}/task/${task.id}/`)
	}
}
