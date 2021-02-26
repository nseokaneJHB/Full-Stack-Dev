import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	constructor(private blog: BlogService, private route: ActivatedRoute) { }

	// Initialization
	user: any = {}

	load(){
		let userID = this.route.snapshot.params
		this.blog.getProfileUser(userID).subscribe((user: any) => {
			this.user = {
				username: user.username,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				phone: user.profile.phone,
				bio: user.profile.bio,
				avatar: user.profile.avatar
			}
		})
	}

	ngOnInit(): void {
		this.load()
	}

}
