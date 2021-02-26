import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	error: any = {}

	authorized: any = false

	constructor(private blog: BlogService) { }

	ngOnInit(): void {
		this.blog.getUser().subscribe((res) => {
			if (res) {
				this.authorized = true	
			}else{
				this.authorized = false
			}
		}, (error) => {
			this.error.statusText = error.statusText
			this.error.status = error.status
		})
	}

	signOut() {
		location.reload()
		localStorage.clear()
		location.href = 'login'
	}

}
