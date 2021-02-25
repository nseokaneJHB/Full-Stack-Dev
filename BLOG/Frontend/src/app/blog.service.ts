import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	constructor(private http: HttpClient) { }

	url = "http://127.0.0.1:8000/api"

	user: any = {
		token: localStorage.getItem('TOKEN'),
		user_id: localStorage.getItem('USER_ID'), 
		username: localStorage.getItem('USERNAME')
	}

	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Token ${this.user.token}`,
	});

	// Logging into the blog
	loginUser(user: any){
		return this.http.post(`${this.url}/api-token-auth/`, user)
	};

	getProfile(){
		return this.http.get(`${this.url}/profile/`, { headers: this.headers })
	}

	// Getting users
	getUsers(){
		return this.http.get(`${this.url}/users/`, { headers: this.headers })
	};

	// Get a user
	getUser(){
		return this.http.get(`${this.url}/user/${this.user.user_id}/`,  { headers: this.headers })
	}

	// Getting all the posts of the users
	getPosts() {
		return this.http.get(`${this.url}/posts/`, { headers: this.headers })
	};

	// Make a post
	post(post: any){
		return this.http.post(`${this.url}/posts/`, post, { headers: this.headers })
	}

	// Get a post
	getPost(post: any){
		return this.http.get(`${this.url}/post/${post.id}/`, { headers: this.headers })
	}

	// Update post
	updatePost(post: any){
		return this.http.put(`${this.url}/post/${post.id}/`, post, { headers: this.headers })
	}

	// Remove post
	removePost(post: any){
		console.log(post);
		return this.http.delete(`${this.url}/post/${post.id}/`, { headers: this.headers })
	}

	// Make a comment
	postComment(post: any, comment: any){
		return this.http.post(`${this.url}/post/${post.id}/`, comment, { headers: this.headers })
	}

	// Get a comment
	getComment(){}

	// Update a comment
	updateComment(){}

	// Remove a comment
	removeComment(){}
}
