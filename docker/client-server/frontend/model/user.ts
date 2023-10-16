import { Injectable } from '@angular/core';

@Injectable()
export class User {
    name: string;
    email: string;
    password: string;
    money: string;

    constructor() {
        this.name = 'Đoàn Cao Nhật Hạ';
        this.email = 'hadoan@gmail.com';
        this.password = '1234';
        this.money = '5000000';
    }
}



