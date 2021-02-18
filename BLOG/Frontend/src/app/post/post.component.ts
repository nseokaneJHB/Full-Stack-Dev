import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	user: any = {}
	post: any = {}
	likes: any = []
	comments: any = []

	constructor(private blog: BlogService, private route: ActivatedRoute) { }

	load(){
		// Get the id from the url
		this.post = this.route.snapshot.params
		
		this.blog.getPost(this.post).subscribe((post: any) => {
			this.blog.getUsers().subscribe((users: any) => {
				for (const user in users) {
					if (users[user].id === post.author) {
						this.user = users[user];
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
		})
	}

	ngOnInit(): void {
		this.load()
	}

}
