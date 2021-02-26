import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	// Initializations
	user: any = {}
	userAuthor: any = {}
	post: any = {}
	likes: any = []
	comments: any = []

	commentForm = new FormGroup({
		author: new FormControl(),
		comment: new FormControl(''),
		blog: new FormControl(),
		likes: new FormControl([])
	})


	constructor(private blog: BlogService, private route: ActivatedRoute) { }

	load(){
	// 	// Get the id from the url
		this.post = this.route.snapshot.params
		
		// Get a post and its comments
		this.blog.getPost(this.post).subscribe((post: any) => {
			this.blog.getUsers().subscribe((users: any) => {
				for (const user in users) {
					if (users[user].id === post.author) {
						this.userAuthor = users[user];
					}

					for (const comment in post.comments) {
						if (users[user].id === post.comments[comment].author) {
							post.comments[comment].author = users[user]
						}
					}
				}
			})
			
			this.post = post
			this.likes = post.likes
			this.comments = post.comments

			this.blog.getUser().subscribe((user: any) => {
				this.user = user
			})
		})
	}

	ngOnInit(): void {
		this.load()
	}

	// Like post
	likePost(post: any){
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

	// Like comment
	likeComment(comment: any){
		this.blog.getUser().subscribe((user: any) => {
			if (comment.likes.find((id: any) => id === user.id) === undefined){
				comment.likes.push(user.id);
			}else{
				comment.likes.splice(comment.likes.indexOf(user.id), 1);
			};

			let author_id = comment.author.id
			
			comment.author = author_id
			this.blog.updateComment(comment).subscribe((res: any) => {
				this.load()
			})
		});
	}

	removeComment(comment: any){
		this.blog.removeComment(comment).subscribe((res: any) => {
			this.load()
		})
	}

	// Submit comment
	submit(){
		this.commentForm.value.author = localStorage.getItem('USER_ID');
		this.commentForm.value.blog = this.route.snapshot.params.id
		this.commentForm.value.likes = []
		
		this.blog.postComment(this.post, this.commentForm.value).subscribe((res: any) => {
			this.commentForm.reset()
			this.load()
		})
	}

}
