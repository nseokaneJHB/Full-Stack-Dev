import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(private blog: BlogService) { }

	// Initialization
	user: any = {}
	profile: any = {}
	userProfile: any = {}

	profileForm = new FormGroup({
		username: new FormControl(),
		email: new FormControl(),
		first_name: new FormControl(),
		last_name: new FormControl(),
		bio: new FormControl(),
		phone: new FormControl(),
		avatar: new FormControl()
	})

	load(){
		this.blog.getProfile().subscribe((res: any) => {
			this.user = res;
			this.profile = res.profile
			
			this.userProfile = {
				username: this.user.username,
				email: this.user.email,
				first_name: this.user.first_name,
				last_name: this.user.last_name,
				bio: this.profile.bio,
				phone: this.profile.phone,
				avatar: this.profile.avatar,
			}

			this.profileForm.setValue(this.userProfile)
		})
	}

	ngOnInit(): void {
		this.load()
	}

	submit(){
		console.log('Submiting changes...', this.profileForm.value);
	}
}
