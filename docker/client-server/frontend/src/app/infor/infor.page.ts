import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infor',
  templateUrl: './infor.page.html',
  styleUrls: ['./infor.page.scss'],
})
export class InforPage implements OnInit {

  user = {
    name: 'Đoàn Cao Nhật Hạ',
    email: "yourmail@gmail.com",
    balance: 1000000
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params && params["user"]) {
        this.user = JSON.parse(params['user']);
        console.log(this.user)
      }
    });
  }

  ngOnInit() {
  }

  back(): void {
    this.router.navigate(['/home']);
  }
}
