import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor() { }

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  public async addNewToGallery() {
    // Take a photo
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 90,
      width: 600
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: image.webPath!
    });
  }

  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);
  
    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.PHOTO_STORAGE,
            value: JSON.stringify(this.photos)
    });
  
    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
  
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
