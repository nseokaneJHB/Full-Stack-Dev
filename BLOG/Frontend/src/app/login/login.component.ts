import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BlogService } from '../blog.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private blog: BlogService) { }

	loginForm: any = new FormGroup({
		username: new FormControl(''),
		password: new FormControl('')
	})

	ngOnInit(): void {}

	submit(){
		this.blog.loginUser(this.loginForm.value).subscribe((res: any) => {
			localStorage.setItem('TOKEN', res.token)
			localStorage.setItem('USER_ID', res.user_id)
			localStorage.setItem('USERNAME', res.username)
			this.loginForm.reset()
			location.href = ''
		}, err => {
			err;
		})
	}
}
