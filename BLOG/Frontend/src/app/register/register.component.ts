import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BlogService } from '../blog.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	constructor(private blog: BlogService) { }

	register: any = new FormGroup({
		username: new FormControl(''),
		email: new FormControl(''),
		password1: new FormControl(''),
		password2: new FormControl('')
	})

	ngOnInit(): void {
		this.register.value = {}
	}

	submit(){
		console.log("");
		
	}
}
