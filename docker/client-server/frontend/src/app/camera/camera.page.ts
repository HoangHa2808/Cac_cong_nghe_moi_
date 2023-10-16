import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { Camera, CameraResultType  } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(private router: Router, public photoService: PhotoService, private loadingCtrl: LoadingController, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  public async takePicture() {
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: true,
    //   resultType: CameraResultType.Uri
    // });
    // this.photoService.addNewToGallery();
    const imageUrl = this.photoService.addNewToGallery();
    console.log('Picture is taken ok!');
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

  back(): void {
    this.router.navigate(['/home']);
  }

}
