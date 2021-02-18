import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private blog: BlogService) { }

	users: any = []
	posts: any = []
	author: any = {}
	posts_users: any = []

	// For converting data back to numbers instead of objects
	likes: any = []

	likes_count: number = 0
	comments_count: number = 0

	postForm = new FormGroup({
		author: new FormControl(),
		post: new FormControl(""),
		likes: new FormControl([])
	})

	load(){
		this.blog.getPosts().subscribe((posts: any) => {
			this.posts = posts
			this.blog.getUsers().subscribe((users: any) => {
				this.users = users
				for (const post in this.posts) {
					for (const user in this.users) {
						// Assign a user object on author field
						if (this.users[user].id === this.posts[post].author) {
							this.posts[post].author = this.users[user]
						}
					}
				}
			})			
		})
	}

	ngOnInit(): void {
		this.load()
	}

	like(post: any){
		// let count = 0
		// this.blog.getUser().subscribe((user: any) => {
			
		// 	for (let i = 0; i < post.likes.length; i++) {
		// 		if (post.likes[i] === user.id) {
		// 			count += 1
		// 		}
		// 	}

		// 	if (count === 1) {
		// 		post.likes.splice(post.likes.indexOf(user.id), 1)
		// 	}else if(count === 0){
		// 		post.likes.push(user.id)
		// 	}

		// 	post.author = user.id
			
		// 	this.blog.updatePost(post).subscribe(res => {
		// 		this.load()
		// 	})
		// })
	}

	submit(){
		this.postForm.value.author = localStorage.getItem('USER_ID');
		this.blog.post(this.postForm.value).subscribe((post: any) => {
			this.postForm.reset();
			this.load();
		})
	}
}
