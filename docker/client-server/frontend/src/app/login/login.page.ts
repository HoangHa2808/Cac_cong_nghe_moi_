import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { Account } from '../model/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class InforComponent implements OnInit {
  private subscription: Subscription = new Subscription(); // khai báo: subscription
  @ViewChild('email') email: any; // khai báo: email
  screen: any = 'signin';
  formData!: FormGroup;
  isLoading: boolean = false;
  check = false;
  users: string[] = [];
  accounts: Account[] = [];
  newAccount = '';
  accountToDelete = '';
  data = [];
  password: string = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { 
    // localStorage.removeItem('account');
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }
 
  async ngOnInit(): Promise<void> {
    this.formData = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
   
      this.accounts = await this.accountService.getAccounts(this.email);
    
  }

  reset(): void {
    this.formData.reset();
  }

  change(event: any) {
    this.screen = event;
  }

  login() {
    let acc = this.formData.get(['email'])?.value; // Account No. entered
    let pass = this.formData.get(['password'])?.value; // Paasword No. entered
    this.accountService.getAccount(acc).then(async (data: any) => {
      if (data) {
        if (acc && pass && this.formData.get(['password'])?.value === data['password']){
          // Hiển thị thông báo đăng nhập thành công
          this.presentToast('Đăng nhập thành công!');
              this.router.navigate(['/home'])
        }else
          this.presentToast('Đăng nhập không thành công. Vui lòng kiểm tra lại mật khẩu.');
      }
      else
        this.presentToast('Tài khoản không tồn tại. Vui lòng kiểm tra lại tài khoản.');

    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async add() {
    if (this.data) {
    let result = this.accountService.addAccount(this.formData.get(['email'])?.value, this.formData.get(['password'])?.value)
    this.showAlert('Thêm tài khoản', 'Thêm tài khoản thành công')
    }else{
      this.showAlert('Thêm tài khoản', 'Tài khoản đã tồn tại')
    }
  }

  checkAccount() {
    if (this.accountService.getAccount('email') != null) {
      this.check = true;
      return this.check;
    }
  }

  async delete(): Promise<void> {
    const result = await this.accountService.deleteAccount(this.formData.get(['email'])?.value);
    this.showAlert('Xoá tài khoản', 'Xoá tài khoản thành công ')
    this.accounts = await this.accountService.getAccounts(this.email);
  }

  async all() {
    let allAcc = this.accountService.getAllAccount();
    let s = '';
    for (let i = 0; i < allAcc.length; i++) {
      s += i+1+'. '+ allAcc[i]['email']+' - ' + allAcc[i]['password'] +'\n\t';
    }  
    this.showAlert('Tất cả tài khoản', '' + s)
    this.accounts = await this.accountService.getAccounts(this.email);
  }

  async showAlert(title: string, msg: string) {
    this.alertController.create({
      header: title,
      // subHeader: 'Subtitle for alert',
      message: msg,
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }
}
