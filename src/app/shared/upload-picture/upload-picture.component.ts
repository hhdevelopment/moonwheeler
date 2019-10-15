import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {Observable, of} from 'rxjs';
import {catchError, filter, flatMap} from 'rxjs/operators';
import {UserService} from '../../core/service/user/user.service';
import {User} from 'firebase';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent {

  private _path: string;

  faFileDownload = faFileDownload;
  url: string;
  uploading = false;

  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private userService: UserService
  ) {
  }

  @ViewChild('fileInput', {static: true})
  file: ElementRef<HTMLInputElement>;

  @Input()
  set path(p: string) {
    this._path = p;
    this.uploading = false;
    this.url = null;
    this.defineUrlFromPath(p);
  }

  get path(): string {
    return this._path;
  }

  @Output()
  pictureUpdate: EventEmitter<string> = new EventEmitter<string>();

  setPicture() {
    if (!this.uploading) {
      this.uploading = true;
      this.file.nativeElement.click();
    }
  }

  onFileAdded() {
    const files: FileList = this.file.nativeElement.files;
    if (files.length) {
      const path = `contents/${this.afs.createId()}`;
      this.uploadPicture(path, files.item(0)).pipe(
        filter(p => p === 100),
        flatMap(p => {
          return this.deletePreviousPicture();
        })
      ).subscribe(() => {
        this.path = path;
        this.pictureUpdate.emit(path);
      });
    }
  }

  private uploadPicture(path: string, file: File): Observable<number> {
    const ref: AngularFireStorageReference = this.afStorage.ref(path);
    return this.userService.getUser().pipe(
      flatMap((user: User) => {
        const metadata: any = {
          createdBy: user.email,
          createdById: user.uid,
          type: file.type,
          name: file.name
        };
        return ref.put(file, metadata).percentageChanges();
      })
    );
  }

  private deletePreviousPicture(): Observable<any> {
    if (!!this.path) {
      const ref: AngularFireStorageReference = this.afStorage.ref(this.path);
      return ref.delete().pipe(
        catchError(err => of(null))
      );
    } else {
      return of(null);
    }
  }

  private defineUrlFromPath(p: string) {
    if (!!p) {
      const ref: AngularFireStorageReference = this.afStorage.ref(`${p}`);
      ref.getDownloadURL().toPromise().then(url => {
        this.url = url;
      });
    }
  }
}
