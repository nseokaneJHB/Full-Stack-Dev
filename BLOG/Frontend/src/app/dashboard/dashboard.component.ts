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
	current_user: any = {}
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

	// Load posts
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
				this.blog.getUser().subscribe((current_user: any) => {
					this.author = current_user
				})
			})			
		})
	}

	ngOnInit(): void {
		this.load()
	}

	// Like post
	like(post: any){
		this.blog.getUser().subscribe((user: any) => {
			if (post.likes.find((id: any) => id === user.id) === undefined){
				post.likes.push(user.id);
			}else{
				post.likes.splice(post.likes.indexOf(user.id), 1);
			};

			this.blog.updatePost(post).subscribe((res: any) => {
				this.load()
			})
		});
	};

	// Submit post
	submit(){
		this.postForm.value.author = localStorage.getItem('USER_ID');
		this.blog.post(this.postForm.value).subscribe((post: any) => {
			this.postForm.reset();
			this.load();
		})
	}

	// Remove post
	remove(post: any){
		this.blog.removePost(post).subscribe((res: any) => {
			this.load();
		})
	}
}
