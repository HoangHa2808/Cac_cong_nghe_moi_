import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
// formData!: FormGroup;
  user = {
    name: 'Đoàn Cao Nhật Hạ',
    email: "yourmail@gmail.com",
    balance: null
  }
  // data = [];
  

  constructor(private router: Router, private route: ActivatedRoute,
     private fb: FormBuilder,
     private accountService: AccountService,) {
    this.route.queryParams.subscribe(params => {
      // console.log(params)
      if (params && params["user"]) {
        this.user = JSON.parse(params['user']);
        console.log(this.user)
      }
    });
  
  }

  ngOnInit() {}

  infor(){
    this.router.navigate(['/infor'])
  }

  camera() {
    this.router.navigate(['/camera'])
  }

  map() {
    this.router.navigate(['/map'])
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }


}
